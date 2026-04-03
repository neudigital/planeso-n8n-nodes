import type { INodeProperties } from 'n8n-workflow';
import {
	cursorPagination,
	epicIdField,
	expandFieldsOrderBy,
	projectIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['epic'] };
const base = '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/epics';

export const epicDescription: INodeProperties[] = [
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
				action: 'Create epic',
				routing: {
					request: {
						method: 'POST',
						url: `${base}/`,
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				action: 'List epics',
				routing: {
					request: {
						method: 'GET',
						url: `${base}/`,
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get epic',
				routing: {
					request: {
						method: 'GET',
						url: `${base}/{{$parameter.epicId}}/`,
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update epic',
				routing: {
					request: {
						method: 'PATCH',
						url: `${base}/{{$parameter.epicId}}/`,
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete epic',
				routing: {
					request: {
						method: 'DELETE',
						url: `${base}/{{$parameter.epicId}}/`,
					},
				},
			},
			{
				name: 'Add Work Items',
				value: 'addWorkItems',
				action: 'Add work items to epic',
				routing: {
					request: {
						method: 'POST',
						url: `${base}/{{$parameter.epicId}}/issues/`,
					},
				},
			},
			{
				name: 'List Work Items',
				value: 'listWorkItems',
				action: 'List epic work items',
				routing: {
					request: {
						method: 'GET',
						url: `${base}/{{$parameter.epicId}}/issues/`,
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
		...epicIdField,
		displayOptions: {
			show: {
				...show,
				operation: ['get', 'update', 'delete', 'addWorkItems', 'listWorkItems'],
			},
		},
	},
	...cursorPagination({
		...show,
		operation: ['list', 'listWorkItems'],
	}),
	...expandFieldsOrderBy({
		...show,
		operation: ['list', 'get', 'listWorkItems'],
	}),
	{
		displayName: 'Request Body',
		name: 'requestBody',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				...show,
				operation: ['create', 'update', 'addWorkItems'],
			},
		},
		default: '{}',
		routing: { send: { type: 'body' } },
	},
];
