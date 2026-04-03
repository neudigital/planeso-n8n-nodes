import type { INodeProperties } from 'n8n-workflow';
import {
	projectIdField,
	propertyIdField,
	workItemIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['customPropertyValue'] };
const base =
	'=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/work-items/{{$parameter.workItemId}}/work-item-properties/{{$parameter.propertyId}}/values';

export const customPropertyValueDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		default: 'get',
		options: [
			{
				name: 'Create or Upsert',
				value: 'create',
				action: 'Add property value',
				routing: {
					request: {
						method: 'POST',
						url: `${base}/`,
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get property value s',
				routing: {
					request: {
						method: 'GET',
						url: `${base}/`,
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update property value',
				routing: {
					request: {
						method: 'PATCH',
						url: `${base}/`,
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete property value s',
				routing: {
					request: {
						method: 'DELETE',
						url: `${base}/`,
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
		...propertyIdField,
		displayOptions: { show },
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
