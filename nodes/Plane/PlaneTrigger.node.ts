import { createHmac, timingSafeEqual } from 'crypto';
import type {
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

/** Values sent in `X-Plane-Event` (see https://developers.plane.so/dev-tools/intro-webhooks) */
const PLANE_EVENT_VALUES = ['project', 'issue', 'cycle', 'module', 'issue_comment'] as const;
type PlaneEventValue = (typeof PLANE_EVENT_VALUES)[number];

/** Payload `action` values (Plane uses `created`, `update`, `delete`; some payloads may use `create`) */
const PLANE_ACTION_FILTER_VALUES = ['created', 'update', 'delete'] as const;

function normalizeAction(action: string): string {
	const a = action.toLowerCase();
	if (a === 'create') return 'created';
	return a;
}

function isPlaneEvent(value: string): value is PlaneEventValue {
	return (PLANE_EVENT_VALUES as readonly string[]).includes(value);
}

async function getSignaturePayloadBuffer(context: IWebhookFunctions): Promise<Buffer> {
	const req = context.getRequestObject() as {
		rawBody?: Buffer;
		readRawBody?: () => Promise<void>;
	};

	if (typeof req.readRawBody === 'function' && !req.rawBody) {
		await req.readRawBody();
	}

	if (req.rawBody && Buffer.isBuffer(req.rawBody)) {
		return req.rawBody;
	}

	const body = context.getBodyData();
	return Buffer.from(JSON.stringify(body ?? {}), 'utf8');
}

function verifyPlaneSignature(secret: string, payload: Buffer, signatureHeader: string | undefined): boolean {
	if (!signatureHeader) {
		return false;
	}
	const expected = createHmac('sha256', secret).update(payload).digest('hex');
	const a = Buffer.from(expected, 'utf8');
	const b = Buffer.from(signatureHeader.trim(), 'utf8');
	if (a.length !== b.length) {
		return false;
	}
	return timingSafeEqual(a, b);
}

// Trigger nodes are not used as AI tools (no execute / supplyData).
// eslint-disable-next-line @n8n/community-nodes/node-usable-as-tool -- webhook trigger
export class PlaneTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Plane Trigger',
		name: 'planeTrigger',
		icon: 'file:plane.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["events"].length ? $parameter["events"].join(", ") : "All events"}}',
		description:
			'Starts the workflow when Plane sends a webhook (project, work item, cycle, module, or comment events)',
		defaults: {
			name: 'Plane Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'planeApi',
				required: false,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				path: 'plane',
				responseMode: 'onReceived',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				options: [
					{ name: 'Cycle', value: 'cycle' },
					{ name: 'Issue Comment', value: 'issue_comment' },
					{ name: 'Module', value: 'module' },
					{ name: 'Project', value: 'project' },
					{ name: 'Work Item (Issue)', value: 'issue' },
				],
				default: [...PLANE_EVENT_VALUES],
				description:
					'Which Plane webhook event types should start the workflow (matches X-Plane-Event). Leave all selected to accept every type.',
			},
			{
				displayName: 'Actions',
				name: 'actions',
				type: 'multiOptions',
				options: [
					{ name: 'Created', value: 'created' },
					{ name: 'Deleted', value: 'delete' },
					{ name: 'Updated', value: 'update' },
				],
				default: [...PLANE_ACTION_FILTER_VALUES],
				description:
					'Which payload actions should start the workflow. “Created” also matches a payload action of create.',
			},
			{
				displayName: 'Webhook Secret',
				name: 'webhookSecret',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description:
					'Optional. Secret from Plane (CSV when the webhook is created). When set, the node verifies the X-Plane-Signature header (HMAC-SHA256).',
			},
			{
				displayName: 'Setup',
				name: 'setupNotice',
				type: 'notice',
				default: '',
				description:
					'In Plane, create a webhook and set its URL to the Production or Test URL shown below. Select the same events you want here. Plane requires a public HTTPS URL (use a tunnel for local dev).',
			},
		],
		triggerPanel: {
			header: 'Plane webhook',
			activationHint: {
				active: 'Configure this URL in Plane workspace webhooks.',
				inactive: 'Activate the workflow, then copy the Production URL into Plane.',
			},
		},
		documentationUrl: 'https://developers.plane.so/dev-tools/intro-webhooks',
		sensitiveOutputFields: ['headers.x-plane-signature'],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const headers = this.getHeaderData();
		const headerEventRaw = headers['x-plane-event'];
		const headerEvent =
			typeof headerEventRaw === 'string' ? headerEventRaw : headerEventRaw?.[0] ?? '';

		const bodyData = this.getBodyData() as IDataObject;
		const bodyEvent = typeof bodyData.event === 'string' ? bodyData.event : '';
		const eventType = (headerEvent || bodyEvent).toLowerCase();

		const actionRaw = typeof bodyData.action === 'string' ? bodyData.action : '';
		const normalizedAction = normalizeAction(actionRaw);

		const selectedEvents = this.getNodeParameter('events', []) as string[];
		const selectedActions = this.getNodeParameter('actions', []) as string[];

		const secret = (this.getNodeParameter('webhookSecret', '') as string).trim();
		if (secret) {
			const signatureRaw = headers['x-plane-signature'];
			const signature =
				typeof signatureRaw === 'string' ? signatureRaw : signatureRaw?.[0] ?? undefined;
			const payloadBuffer = await getSignaturePayloadBuffer(this);
			if (!verifyPlaneSignature(secret, payloadBuffer, signature)) {
				const res = this.getResponseObject();
				res.status(403).send('Invalid signature').end();
				return { noWebhookResponse: true };
			}
		}

		if (selectedEvents.length > 0) {
			if (!eventType || !isPlaneEvent(eventType) || !selectedEvents.includes(eventType)) {
				return { webhookResponse: 'OK' };
			}
		}

		if (normalizedAction && selectedActions.length > 0) {
			const allowed = selectedActions.map((a) => normalizeAction(a));
			if (!allowed.includes(normalizedAction)) {
				return { webhookResponse: 'OK' };
			}
		}

		const deliveryRaw = headers['x-plane-delivery'];
		const deliveryId =
			typeof deliveryRaw === 'string' ? deliveryRaw : deliveryRaw?.[0] ?? undefined;

		const item: IDataObject = {
			...bodyData,
			headers: {
				'x-plane-delivery': deliveryId,
				'x-plane-event': eventType || headerEvent,
				'x-plane-signature': headers['x-plane-signature'],
			},
		};

		return {
			workflowData: [this.helpers.returnJsonArray(item)],
		};
	}
}
