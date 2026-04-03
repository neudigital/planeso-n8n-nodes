import type { INodeProperties } from 'n8n-workflow';
import {
	cursorPagination,
	expandFieldsOrderBy,
	teamspaceIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['teamspace'] };
const ws = '=/api/v1/workspaces/{{$parameter.workspaceSlug}}';

export const teamspaceDescription: INodeProperties[] = [
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
				routing: { request: { method: 'POST', url: `${ws}/teamspaces/` } },
			},
			{
				name: 'List',
				value: 'list',
				routing: { request: { method: 'GET', url: `${ws}/teamspaces/` } },
			},
			{
				name: 'Get',
				value: 'get',
				routing: {
					request: {
						method: 'GET',
						url: `${ws}/teamspaces/{{$parameter.teamspaceId}}/`,
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				routing: {
					request: {
						method: 'PATCH',
						url: `${ws}/teamspaces/{{$parameter.teamspaceId}}/`,
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				routing: {
					request: {
						method: 'DELETE',
						url: `${ws}/teamspaces/{{$parameter.teamspaceId}}/`,
					},
				},
			},
			{
				name: 'List Members',
				value: 'listMembers',
				routing: {
					request: {
						method: 'GET',
						url: `${ws}/teamspaces/{{$parameter.teamspaceId}}/members/`,
					},
				},
			},
			{
				name: 'Add Members',
				value: 'addMembers',
				routing: {
					request: {
						method: 'POST',
						url: `${ws}/teamspaces/{{$parameter.teamspaceId}}/members/`,
					},
				},
			},
			{
				name: 'Remove Members',
				value: 'removeMembers',
				routing: {
					request: {
						method: 'DELETE',
						url: `${ws}/teamspaces/{{$parameter.teamspaceId}}/members/`,
					},
				},
			},
			{
				name: 'List Projects',
				value: 'listProjects',
				routing: {
					request: {
						method: 'GET',
						url: `${ws}/teamspaces/{{$parameter.teamspaceId}}/projects/`,
					},
				},
			},
			{
				name: 'Add Projects',
				value: 'addProjects',
				routing: {
					request: {
						method: 'POST',
						url: `${ws}/teamspaces/{{$parameter.teamspaceId}}/projects/`,
					},
				},
			},
			{
				name: 'Remove Projects',
				value: 'removeProjects',
				routing: {
					request: {
						method: 'DELETE',
						url: `${ws}/teamspaces/{{$parameter.teamspaceId}}/projects/`,
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
		...teamspaceIdField,
		displayOptions: {
			show: {
				...show,
				operation: [
					'get',
					'update',
					'delete',
					'listMembers',
					'addMembers',
					'removeMembers',
					'listProjects',
					'addProjects',
					'removeProjects',
				],
			},
		},
	},
	...cursorPagination({
		...show,
		operation: ['list', 'listMembers', 'listProjects'],
	}),
	...expandFieldsOrderBy({
		...show,
		operation: ['list', 'get', 'listMembers', 'listProjects'],
	}),
	{
		displayName: 'Request Body',
		name: 'requestBody',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				...show,
				operation: ['create', 'update', 'addMembers', 'addProjects'],
			},
		},
		default: '{}',
		routing: { send: { type: 'body' } },
	},
];
