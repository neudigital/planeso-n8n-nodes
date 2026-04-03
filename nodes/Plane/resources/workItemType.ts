import type { INodeProperties } from 'n8n-workflow';
import {
	projectIdField,
	resourceIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['workItemType'] };
const base = '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/work-item-types';

export const workItemTypeDescription: INodeProperties[] = [
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
				action: 'Create work item type',
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
				action: 'List work item types',
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
				action: 'Get work item type',
				routing: {
					request: {
						method: 'GET',
						url: `${base}/{{$parameter.resourceId}}/`,
					},
				},
			},
			{
				name: 'Get Schema',
				value: 'getSchema',
				action: 'Get work item type schema',
				routing: {
					request: {
						method: 'GET',
						url: `${base}/{{$parameter.resourceId}}/schema/`,
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update work item type',
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
				action: 'Delete work item type',
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
				operation: ['get', 'getSchema', 'update', 'delete'],
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
				operation: ['create', 'update'],
			},
		},
		default: '{}',
		routing: { send: { type: 'body' } },
	},
];
