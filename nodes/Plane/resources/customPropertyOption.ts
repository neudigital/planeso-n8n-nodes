import type { INodeProperties } from 'n8n-workflow';
import {
	optionIdField,
	projectIdField,
	propertyIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['customPropertyOption'] };
const base =
	'=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/work-item-properties/{{$parameter.propertyId}}/options';

export const customPropertyOptionDescription: INodeProperties[] = [
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
				action: 'Create dropdown option',
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
				action: 'List dropdown options',
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
				action: 'Get option',
				routing: {
					request: {
						method: 'GET',
						url: `${base}/{{$parameter.optionId}}/`,
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update option',
				routing: {
					request: {
						method: 'PATCH',
						url: `${base}/{{$parameter.optionId}}/`,
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete option',
				routing: {
					request: {
						method: 'DELETE',
						url: `${base}/{{$parameter.optionId}}/`,
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
		...propertyIdField,
		displayOptions: { show },
	},
	{
		...optionIdField,
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
