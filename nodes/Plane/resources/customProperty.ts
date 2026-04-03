import type { INodeProperties } from 'n8n-workflow';
import {
	projectIdField,
	propertyIdField,
	workItemTypeIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['customProperty'] };
const base = '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/work-item-types/{{$parameter.typeId}}/work-item-properties';

export const customPropertyDescription: INodeProperties[] = [
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
				action: 'Create custom property',
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
				action: 'List custom properties',
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
				action: 'Get custom property',
				routing: {
					request: {
						method: 'GET',
						url: `${base}/{{$parameter.propertyId}}/`,
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update custom property',
				routing: {
					request: {
						method: 'PATCH',
						url: `${base}/{{$parameter.propertyId}}/`,
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete custom property',
				routing: {
					request: {
						method: 'DELETE',
						url: `${base}/{{$parameter.propertyId}}/`,
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
		...workItemTypeIdField,
		displayOptions: { show },
	},
	{
		...propertyIdField,
		displayOptions: {
			show: {
				...show,
				operation: ['get', 'update', 'delete'],
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
