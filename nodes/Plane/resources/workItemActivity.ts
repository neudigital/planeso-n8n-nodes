import type { INodeProperties } from 'n8n-workflow';
import {
	cursorPagination,
	expandFieldsOrderBy,
	projectIdField,
	resourceIdField,
	workItemIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['workItemActivity'] };
const base = '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/work-items/{{$parameter.workItemId}}/activities';

export const workItemActivityDescription: INodeProperties[] = [
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
				action: 'List work item activities',
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
				action: 'Get activity',
				routing: {
					request: {
						method: 'GET',
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
				operation: ['get'],
			},
		},
	},
	...cursorPagination({ ...show, operation: ['list'] }),
	...expandFieldsOrderBy({ ...show, operation: ['list', 'get'] }),
];
