import type { INodeProperties } from 'n8n-workflow';
import { workspaceSlugField } from '../shared/descriptions';

const show = { resource: ['workspaceFeature'] };

export const workspaceFeatureDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		default: 'get',
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get workspace feature flags',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/features/',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update workspace features',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/features/',
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
		displayName: 'Request Body',
		name: 'requestBody',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				...show,
				operation: ['update'],
			},
		},
		default: '{}',
		description: 'JSON body per Plane API (workspace features update)',
		routing: {
			send: {
				type: 'body',
			},
		},
	},
];
