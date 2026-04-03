import type { INodeProperties } from 'n8n-workflow';
import {
	cursorPagination,
	expandFieldsOrderBy,
	projectIdField,
	resourceIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['intakeIssue'] };
const base =
	'=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/intake-issues';

export const intakeIssueDescription: INodeProperties[] = [
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
				action: 'Create intake work item',
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
				action: 'List intake work items',
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
				action: 'Get intake work item',
				routing: {
					request: {
						method: 'GET',
						url: `${base}/{{$parameter.resourceId}}/`,
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update intake work item',
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
				action: 'Delete intake work item',
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
