import type { INodeProperties } from 'n8n-workflow';
import { projectIdField, workspaceSlugField } from '../shared/descriptions';

const show = { resource: ['projectFeature'] };

export const projectFeatureDescription: INodeProperties[] = [
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
				action: 'Get project features',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/features/',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update project features',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/features/',
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
		routing: { send: { type: 'body' } },
	},
];
