import type { INodeProperties } from 'n8n-workflow';
import {
	cursorPagination,
	expandFieldsOrderBy,
	stickyIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['sticky'] };
const base = '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/stickies';

export const stickyDescription: INodeProperties[] = [
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
				routing: { request: { method: 'POST', url: `${base}/` } },
			},
			{
				name: 'List',
				value: 'list',
				routing: { request: { method: 'GET', url: `${base}/` } },
			},
			{
				name: 'Get',
				value: 'get',
				routing: {
					request: { method: 'GET', url: `${base}/{{$parameter.stickyId}}/` },
				},
			},
			{
				name: 'Update',
				value: 'update',
				routing: {
					request: { method: 'PATCH', url: `${base}/{{$parameter.stickyId}}/` },
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				routing: {
					request: { method: 'DELETE', url: `${base}/{{$parameter.stickyId}}/` },
				},
			},
		],
	},
	{
		...workspaceSlugField,
		displayOptions: { show },
	},
	{
		...stickyIdField,
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
