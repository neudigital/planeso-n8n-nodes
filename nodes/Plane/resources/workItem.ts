import type { INodeProperties } from 'n8n-workflow';
import {
	cursorPagination,
	expandFieldsOrderBy,
	identifierField,
	projectIdField,
	resourceIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['workItem'] };

export const workItemDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		default: 'list',
		options: [
			{
				name: 'Advanced Search',
				value: 'advancedSearch',
				action: 'Advanced search work items',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/work-items/search/advanced/',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create work item',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/work-items/',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete work item',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/work-items/{{$parameter.resourceId}}/',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get work item',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/work-items/{{$parameter.resourceId}}/',
					},
				},
			},
			{
				name: 'Get by Identifier',
				value: 'getByIdentifier',
				action: 'Get work item by identifier',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/work-items/by-identifier/{{$parameter.identifier}}/',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				action: 'List work items',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/work-items/',
					},
				},
			},
			{
				name: 'Search',
				value: 'search',
				action: 'Search work items',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/work-items/search/',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update work item',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/work-items/{{$parameter.resourceId}}/',
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
				operation: ['get', 'update', 'delete'],
			},
		},
	},
	{
		...identifierField,
		displayOptions: {
			show: {
				...show,
				operation: ['getByIdentifier'],
			},
		},
	},
	...cursorPagination({
		...show,
		operation: ['list', 'search'],
	}),
	...expandFieldsOrderBy({
		...show,
		operation: ['list', 'get', 'getByIdentifier', 'search'],
	}),
	{
		displayName: 'External ID',
		name: 'externalId',
		type: 'string',
		displayOptions: {
			show: {
				...show,
				operation: ['list', 'get'],
			},
		},
		default: '',
		routing: {
			send: { type: 'query', property: 'external_id' },
		},
	},
	{
		displayName: 'External Source',
		name: 'externalSource',
		type: 'string',
		displayOptions: {
			show: {
				...show,
				operation: ['list', 'get'],
			},
		},
		default: '',
		routing: {
			send: { type: 'query', property: 'external_source' },
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
				operation: ['create', 'update', 'advancedSearch'],
			},
		},
		default: '{}',
		routing: { send: { type: 'body' } },
	},
];
