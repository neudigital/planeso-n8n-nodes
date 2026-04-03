import type { INodeProperties } from 'n8n-workflow';
import {
	cursorPagination,
	expandFieldsOrderBy,
	projectIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['project'] };

export const projectDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		default: 'list',
		options: [
			{
				name: 'Archive',
				value: 'archive',
				action: 'Archive project',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/archive/',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create project',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete project',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get project',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				action: 'List projects',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/',
					},
				},
			},
			{
				name: 'Unarchive',
				value: 'unarchive',
				action: 'Unarchive project',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/unarchive/',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update project',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/',
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
		displayOptions: {
			show: {
				...show,
				operation: ['get', 'update', 'archive', 'unarchive', 'delete'],
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
		description: 'JSON body per Plane API',
		routing: { send: { type: 'body' } },
	},
];
