import type { INodeProperties } from 'n8n-workflow';
import {
	cursorPagination,
	expandFieldsOrderBy,
	milestoneIdField,
	projectIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['milestone'] };
const base = '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/milestones';

export const milestoneDescription: INodeProperties[] = [
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
				action: 'Create milestone',
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
				action: 'List milestones',
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
				action: 'Get milestone',
				routing: {
					request: {
						method: 'GET',
						url: `${base}/{{$parameter.milestoneId}}/`,
					},
				},
			},
			{
				name: 'List Work Items',
				value: 'listWorkItems',
				action: 'List milestone work items',
				routing: {
					request: {
						method: 'GET',
						url: `${base}/{{$parameter.milestoneId}}/work-items/`,
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update milestone',
				routing: {
					request: {
						method: 'PATCH',
						url: `${base}/{{$parameter.milestoneId}}/`,
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete milestone',
				routing: {
					request: {
						method: 'DELETE',
						url: `${base}/{{$parameter.milestoneId}}/`,
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
		...milestoneIdField,
		displayOptions: {
			show: {
				...show,
				operation: ['get', 'listWorkItems', 'update', 'delete'],
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
				operation: ['create', 'update'],
			},
		},
		default: '{}',
		routing: { send: { type: 'body' } },
	},
];
