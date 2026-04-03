import type { INodeProperties } from 'n8n-workflow';
import {
	cursorPagination,
	projectIdField,
	workItemIdField,
	worklogIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['timeTracking'] };
const base =
	'=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/work-items/{{$parameter.workItemId}}/worklogs';

export const timeTrackingDescription: INodeProperties[] = [
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
				action: 'Create worklog',
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
				action: 'List worklogs for work item',
				routing: {
					request: {
						method: 'GET',
						url: `${base}/`,
					},
				},
			},
			{
				name: 'Get Total Time',
				value: 'getTotal',
				action: 'Get total logged time',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/work-items/{{$parameter.workItemId}}/total-time/',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update worklog',
				routing: {
					request: {
						method: 'PATCH',
						url: `${base}/{{$parameter.worklogId}}/`,
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete worklog',
				routing: {
					request: {
						method: 'DELETE',
						url: `${base}/{{$parameter.worklogId}}/`,
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
		...worklogIdField,
		displayOptions: {
			show: {
				...show,
				operation: ['update', 'delete'],
			},
		},
	},
	...cursorPagination({ ...show, operation: ['list'] }),
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
