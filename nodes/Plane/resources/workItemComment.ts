import type { INodeProperties } from 'n8n-workflow';
import {
	cursorPagination,
	expandFieldsOrderBy,
	projectIdField,
	resourceIdField,
	workItemIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['workItemComment'] };

export const workItemCommentDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		default: 'list',
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create comment',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/work-items/{{$parameter.workItemId}}/comments/',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete comment',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/work-items/{{$parameter.workItemId}}/comments/{{$parameter.resourceId}}/',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get comment',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/work-items/{{$parameter.workItemId}}/comments/{{$parameter.resourceId}}/',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				action: 'List comments',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/work-items/{{$parameter.workItemId}}/comments/',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update comment',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/work-items/{{$parameter.workItemId}}/comments/{{$parameter.resourceId}}/',
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
				operation: ['get', 'update', 'delete'],
			},
		},
	},
	...cursorPagination({ ...show, operation: ['list'] }),
	...expandFieldsOrderBy({ ...show, operation: ['list', 'get'] }),
	{
		displayName: 'Request Body',
		name: 'requestBody',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				...show,
				operation: ['create', 'update'],
			},
		},
		default: '{}',
		routing: { send: { type: 'body' } },
	},
];
