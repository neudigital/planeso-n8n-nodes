import type { INodeProperties } from 'n8n-workflow';
import {
	expandFieldsOrderBy,
	memberIdField,
	projectIdField,
	projectMemberIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['member'] };

export const memberDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		default: 'getWorkspaceMembers',
		options: [
			{
				name: 'Add Project Member',
				value: 'addProjectMember',
				action: 'Add project member',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/members/',
					},
				},
			},
			{
				name: 'Delete Project Member',
				value: 'deleteProjectMember',
				action: 'Delete project member',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/members/{{$parameter.projectMemberId}}/',
					},
				},
			},
			{
				name: 'Get Project Member',
				value: 'getProjectMember',
				action: 'Get project member',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/members/{{$parameter.projectMemberId}}/',
					},
				},
			},
			{
				name: 'Get Project Members',
				value: 'getProjectMembers',
				action: 'List project members',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/members/',
					},
				},
			},
			{
				name: 'Get Workspace Members',
				value: 'getWorkspaceMembers',
				action: 'List workspace members',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/members/',
					},
				},
			},
			{
				name: 'Remove Workspace Member',
				value: 'removeWorkspaceMember',
				action: 'Remove a workspace member',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/members/{{$parameter.memberId}}/',
					},
				},
			},
			{
				name: 'Update Project Member',
				value: 'updateProjectMember',
				action: 'Update project member',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/members/{{$parameter.projectMemberId}}/',
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
				operation: [
					'getProjectMembers',
					'addProjectMember',
					'getProjectMember',
					'updateProjectMember',
					'deleteProjectMember',
				],
			},
		},
	},
	{
		...memberIdField,
		displayOptions: {
			show: {
				...show,
				operation: ['removeWorkspaceMember'],
			},
		},
	},
	{
		...projectMemberIdField,
		displayOptions: {
			show: {
				...show,
				operation: ['getProjectMember', 'updateProjectMember', 'deleteProjectMember'],
			},
		},
	},
	...expandFieldsOrderBy({
		...show,
		operation: ['getWorkspaceMembers', 'getProjectMembers', 'getProjectMember'],
	}),
	{
		displayName: 'Request Body',
		name: 'requestBody',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				...show,
				operation: ['addProjectMember', 'updateProjectMember'],
			},
		},
		default: '{}',
		routing: { send: { type: 'body' } },
	},
];
