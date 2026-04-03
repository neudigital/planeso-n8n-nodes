import type { INodeProperties } from 'n8n-workflow';
import {
	cursorPagination,
	cycleIdField,
	expandFieldsOrderBy,
	projectIdField,
	workItemIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['cycle'] };

export const cycleDescription: INodeProperties[] = [
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
				action: 'Add work items to cycle',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/cycles/{{$parameter.cycleId}}/work-items/',
					},
				},
			},
			{
				name: 'Archive',
				value: 'archive',
				action: 'Archive cycle',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/cycles/{{$parameter.cycleId}}/archive/',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create cycle',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/cycles/',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete cycle',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/cycles/{{$parameter.cycleId}}/',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get cycle',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/cycles/{{$parameter.cycleId}}/',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				action: 'List cycles',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/cycles/',
					},
				},
			},
			{
				name: 'List Archived',
				value: 'listArchived',
				action: 'List archived cycles',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/cycles/archived/',
					},
				},
			},
			{
				name: 'List Work Items',
				value: 'listWorkItems',
				action: 'List work items in cycle',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/cycles/{{$parameter.cycleId}}/work-items/',
					},
				},
			},
			{
				name: 'Remove Work Item',
				value: 'removeWorkItem',
				action: 'Remove work item from cycle',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/cycles/{{$parameter.cycleId}}/cycle-issues/{{$parameter.workItemId}}/',
					},
				},
			},
			{
				name: 'Transfer Work Items',
				value: 'transferWorkItems',
				action: 'Transfer work items between cycles',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/cycles/{{$parameter.cycleId}}/transfer-work-items/',
					},
				},
			},
			{
				name: 'Unarchive',
				value: 'unarchive',
				action: 'Unarchive cycle',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/cycles/{{$parameter.cycleId}}/unarchive/',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update cycle',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/cycles/{{$parameter.cycleId}}/',
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
		...cycleIdField,
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
					'transferWorkItems',
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
				operation: ['create', 'update', 'addWorkItems', 'transferWorkItems', 'archive', 'unarchive'],
			},
		},
		default: '{}',
		description: 'JSON body per Plane API (use {} when optional)',
		routing: { send: { type: 'body' } },
	},
];
