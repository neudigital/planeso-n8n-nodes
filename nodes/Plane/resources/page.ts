import type { INodeProperties } from 'n8n-workflow';
import { pageIdField, projectIdField, workspaceSlugField } from '../shared/descriptions';

const show = { resource: ['page'] };

export const pageDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		default: 'addWorkspacePage',
		options: [
			{
				name: 'Add Workspace Page',
				value: 'addWorkspacePage',
				action: 'Create workspace wiki page',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/pages/',
					},
				},
			},
			{
				name: 'Add Project Page',
				value: 'addProjectPage',
				action: 'Create project wiki page',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/pages/',
					},
				},
			},
			{
				name: 'Get Workspace Page',
				value: 'getWorkspacePage',
				action: 'Get workspace page',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/pages/{{$parameter.pageId}}/',
					},
				},
			},
			{
				name: 'Get Project Page',
				value: 'getProjectPage',
				action: 'Get project page',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/pages/{{$parameter.pageId}}/',
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
		displayOptions: {
			show: {
				...show,
				operation: ['addProjectPage', 'getProjectPage'],
			},
		},
	},
	{
		...pageIdField,
		displayOptions: {
			show: {
				...show,
				operation: ['getWorkspacePage', 'getProjectPage'],
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
				operation: ['addWorkspacePage', 'addProjectPage'],
			},
		},
		default: '{}',
		routing: { send: { type: 'body' } },
	},
];
