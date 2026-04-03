import type { INodeProperties } from 'n8n-workflow';
import {
	cursorPagination,
	expandFieldsOrderBy,
	moduleIdField,
	projectIdField,
	workItemIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['module'] };

export const moduleDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		default: 'list',
		options: [
			{
				name: 'Add Work Items',
				value: 'addWorkItems',
				action: 'Add work items to module',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/modules/{{$parameter.moduleId}}/work-items/',
					},
				},
			},
			{
				name: 'Archive',
				value: 'archive',
				action: 'Archive module',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/modules/{{$parameter.moduleId}}/archive/',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create module',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/modules/',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete module',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/modules/{{$parameter.moduleId}}/',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get module',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/modules/{{$parameter.moduleId}}/',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				action: 'List modules',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/modules/',
					},
				},
			},
			{
				name: 'List Archived',
				value: 'listArchived',
				action: 'List archived modules',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/modules/archived/',
					},
				},
			},
			{
				name: 'List Work Items',
				value: 'listWorkItems',
				action: 'List work items in module',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/modules/{{$parameter.moduleId}}/work-items/',
					},
				},
			},
			{
				name: 'Remove Work Item',
				value: 'removeWorkItem',
				action: 'Remove work item from module',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/modules/{{$parameter.moduleId}}/module-issues/{{$parameter.workItemId}}/',
					},
				},
			},
			{
				name: 'Unarchive',
				value: 'unarchive',
				action: 'Unarchive module',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/modules/{{$parameter.moduleId}}/unarchive/',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update module',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/modules/{{$parameter.moduleId}}/',
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
		...moduleIdField,
		displayOptions: {
			show: {
				...show,
				operation: [
					'get',
					'update',
					'archive',
					'unarchive',
					'delete',
					'addWorkItems',
					'listWorkItems',
					'removeWorkItem',
				],
			},
		},
	},
	{
		...workItemIdField,
		displayOptions: {
			show: {
				...show,
				operation: ['removeWorkItem'],
			},
		},
	},
	...cursorPagination({
		...show,
		operation: ['list', 'listArchived', 'listWorkItems'],
	}),
	...expandFieldsOrderBy({
		...show,
		operation: ['list', 'listArchived', 'get', 'listWorkItems'],
	}),
	{
		displayName: 'Request Body',
		name: 'requestBody',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				...show,
				operation: ['create', 'update', 'addWorkItems', 'archive', 'unarchive'],
			},
		},
		default: '{}',
		routing: { send: { type: 'body' } },
	},
];
