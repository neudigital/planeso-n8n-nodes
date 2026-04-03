import type { INodeProperties } from 'n8n-workflow';
import {
	projectIdField,
	resourceIdField,
	workItemIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['workItemAttachment'] };
const base = '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/work-items/{{$parameter.workItemId}}/attachments';

export const workItemAttachmentDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		default: 'list',
		options: [
			{
				name: 'List',
				value: 'list',
				action: 'List attachments',
				routing: {
					request: {
						method: 'GET',
						url: `${base}/`,
					},
				},
			},
			{
				name: 'Get Upload Credentials',
				value: 'getUploadCredentials',
				action: 'Create attachment & get upload credentials',
				routing: {
					request: {
						method: 'POST',
						url: `${base}/`,
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get attachment',
				routing: {
					request: {
						method: 'GET',
						url: `${base}/{{$parameter.resourceId}}/`,
					},
				},
			},
			{
				name: 'Complete Upload',
				value: 'completeUpload',
				action: 'Mark attachment uploaded (PATCH)',
				routing: {
					request: {
						method: 'PATCH',
						url: `${base}/{{$parameter.resourceId}}/`,
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update attachment metadata',
				routing: {
					request: {
						method: 'PATCH',
						url: `${base}/{{$parameter.resourceId}}/`,
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete attachment',
				routing: {
					request: {
						method: 'DELETE',
						url: `${base}/{{$parameter.resourceId}}/`,
					},
				},
			},
		],
	},
	{
		...workspaceSlugField,
		displayOptions: { show },
	},
	{
		...projectIdField,
		displayOptions: { show },
	},
	{
		...workItemIdField,
		displayOptions: { show },
	},
	{
		...resourceIdField,
		displayOptions: {
			show: {
				...show,
				operation: ['get', 'completeUpload', 'update', 'delete'],
			},
		},
	},
	{
		displayName: 'Request Body',
		name: 'requestBody',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				...show,
				operation: ['getUploadCredentials', 'completeUpload', 'update'],
			},
		},
		default: '{}',
		description: 'For Get Upload Credentials: name, size, type (MIME). For Complete Upload: is_uploaded: true.',
		routing: { send: { type: 'body' } },
	},
];
