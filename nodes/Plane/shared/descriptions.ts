import type { INodeProperties } from 'n8n-workflow';

/** n8n resource / operation display filter */
export type ShowFilter = NonNullable<INodeProperties['displayOptions']>['show'];

export const workspaceSlugField: INodeProperties = {
	displayName: 'Workspace Slug',
	name: 'workspaceSlug',
	type: 'string',
	required: true,
	default: '',
	description: 'Workspace slug from the URL (e.g. my-team in https://app.plane.so/my-team/)',
};

export const projectIdField: INodeProperties = {
	displayName: 'Project ID',
	name: 'projectId',
	type: 'string',
	required: true,
	default: '',
	description: 'Project UUID',
};

export const workItemIdField: INodeProperties = {
	displayName: 'Work Item ID',
	name: 'workItemId',
	type: 'string',
	required: true,
	default: '',
	description: 'Work item UUID',
};

export const resourceIdField: INodeProperties = {
	displayName: 'Resource ID',
	name: 'resourceId',
	type: 'string',
	required: true,
	default: '',
	description: 'Resource UUID',
};

export const cycleIdField: INodeProperties = {
	displayName: 'Cycle ID',
	name: 'cycleId',
	type: 'string',
	required: true,
	default: '',
};

export const moduleIdField: INodeProperties = {
	displayName: 'Module ID',
	name: 'moduleId',
	type: 'string',
	required: true,
	default: '',
};

export const epicIdField: INodeProperties = {
	displayName: 'Epic ID',
	name: 'epicId',
	type: 'string',
	required: true,
	default: '',
};

export const milestoneIdField: INodeProperties = {
	displayName: 'Milestone ID',
	name: 'milestoneId',
	type: 'string',
	required: true,
	default: '',
};

export const estimateIdField: INodeProperties = {
	displayName: 'Estimate ID',
	name: 'estimateId',
	type: 'string',
	required: true,
	default: '',
};

export const pointIdField: INodeProperties = {
	displayName: 'Estimate Point ID',
	name: 'pointId',
	type: 'string',
	required: true,
	default: '',
};

export const workItemTypeIdField: INodeProperties = {
	displayName: 'Work Item Type ID',
	name: 'typeId',
	type: 'string',
	required: true,
	default: '',
};

export const propertyIdField: INodeProperties = {
	displayName: 'Property ID',
	name: 'propertyId',
	type: 'string',
	required: true,
	default: '',
};

export const valueIdField: INodeProperties = {
	displayName: 'Property Value ID',
	name: 'valueId',
	type: 'string',
	required: true,
	default: '',
};

export const optionIdField: INodeProperties = {
	displayName: 'Option ID',
	name: 'optionId',
	type: 'string',
	required: true,
	default: '',
};

export const initiativeIdField: INodeProperties = {
	displayName: 'Initiative ID',
	name: 'initiativeId',
	type: 'string',
	required: true,
	default: '',
};

export const customerIdField: INodeProperties = {
	displayName: 'Customer ID',
	name: 'customerId',
	type: 'string',
	required: true,
	default: '',
};

export const teamspaceIdField: INodeProperties = {
	displayName: 'Teamspace ID',
	name: 'teamspaceId',
	type: 'string',
	required: true,
	default: '',
};

export const stickyIdField: INodeProperties = {
	displayName: 'Sticky ID',
	name: 'stickyId',
	type: 'string',
	required: true,
	default: '',
};

export const worklogIdField: INodeProperties = {
	displayName: 'Worklog ID',
	name: 'worklogId',
	type: 'string',
	required: true,
	default: '',
};

export const pageIdField: INodeProperties = {
	displayName: 'Page ID',
	name: 'pageId',
	type: 'string',
	required: true,
	default: '',
};

export const memberIdField: INodeProperties = {
	displayName: 'Member ID',
	name: 'memberId',
	type: 'string',
	required: true,
	default: '',
	description: 'Workspace member user ID',
};

export const projectMemberIdField: INodeProperties = {
	displayName: 'Project Member ID',
	name: 'projectMemberId',
	type: 'string',
	required: true,
	default: '',
};

export const identifierField: INodeProperties = {
	displayName: 'Issue Identifier',
	name: 'identifier',
	type: 'string',
	required: true,
	default: '',
	description: 'Human-readable identifier (e.g. PROJ-123)',
};

export const initiativeLabelIdField: INodeProperties = {
	displayName: 'Initiative Label ID',
	name: 'initiativeLabelId',
	type: 'string',
	required: true,
	default: '',
};

export const requestIdField: INodeProperties = {
	displayName: 'Request ID',
	name: 'requestId',
	type: 'string',
	required: true,
	default: '',
};

/** Query params used on many list/detail endpoints */
export function expandFieldsOrderBy(show: ShowFilter): INodeProperties[] {
	return [
		{
			displayName: 'Expand',
			name: 'expand',
			type: 'string',
			displayOptions: { show },
			default: '',
			description: 'Comma-separated related fields to expand',
			routing: {
				send: {
					type: 'query',
					property: 'expand',
				},
			},
		},
		{
			displayName: 'Fields',
			name: 'fields',
			type: 'string',
			displayOptions: { show },
			default: '',
			description: 'Comma-separated fields to return',
			routing: {
				send: {
					type: 'query',
					property: 'fields',
				},
			},
		},
		{
			displayName: 'Order By',
			name: 'orderBy',
			type: 'string',
			displayOptions: { show },
			default: '',
			description: "Sort field; prefix with '-' for descending",
			routing: {
				send: {
					type: 'query',
					property: 'order_by',
				},
			},
		},
	];
}

/** Cursor pagination (Plane: next_cursor, next_page_results, per_page max 100) */
export function cursorPagination(show: ShowFilter): INodeProperties[] {
	return [
		{
			displayName: 'Return All',
			name: 'returnAll',
			type: 'boolean',
			displayOptions: { show },
			default: false,
			description: 'Whether to return all results or only up to a given limit',
			routing: {
				send: {
					paginate: '={{ $value }}',
					type: 'query',
					property: 'per_page',
					value: '100',
				},
				operations: {
					pagination: {
						type: 'generic',
						properties: {
							continue:
								'={{ !!$response.body?.next_page_results && !!$response.body?.next_cursor }}',
							request: {
								qs: {
									cursor: '={{ $response.body.next_cursor }}',
									per_page: '100',
								},
							},
						},
					},
				},
			},
		},
		{
			displayName: 'Limit',
			name: 'limit',
			type: 'number',
			displayOptions: {
				show: {
					...show,
					returnAll: [false],
				},
			},
			typeOptions: {
				minValue: 1,
				maxValue: 100,
			},
			default: 50,
			description: 'Max number of results to return',
			routing: {
				send: {
					type: 'query',
					property: 'per_page',
				},
			},
		},
		{
			displayName: 'Cursor',
			name: 'cursor',
			type: 'string',
			displayOptions: { show },
			default: '',
			description: 'Pagination cursor from a previous response',
			routing: {
				send: {
					type: 'query',
					property: 'cursor',
				},
			},
		},
	];
}
