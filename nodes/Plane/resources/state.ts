import type { INodeProperties } from 'n8n-workflow';
import {
	cursorPagination,
	expandFieldsOrderBy,
	projectIdField,
	resourceIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['state'] };

export const stateDescription: INodeProperties[] = [
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
				action: 'Create state',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/states/',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete state',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/states/{{$parameter.resourceId}}/',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get state',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/states/{{$parameter.resourceId}}/',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				action: 'List states',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/states/',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update state',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/states/{{$parameter.resourceId}}/',
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
