import type { INodeProperties } from 'n8n-workflow';
import { resourceIdField, workspaceSlugField } from '../shared/descriptions';

const show = { resource: ['asset'] };

export const assetDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		default: 'createUserAssetUpload',
		options: [
			{
				name: 'Create User Asset Upload',
				value: 'createUserAssetUpload',
				action: 'Get presigned upload for user asset',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/assets/user-assets/',
					},
				},
			},
			{
				name: 'Create Workspace Asset Upload',
				value: 'createWorkspaceAssetUpload',
				action: 'Get presigned upload for workspace asset',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/assets/',
					},
				},
			},
			{
				name: 'Delete User Asset',
				value: 'deleteUserAsset',
				action: 'Delete user asset',
				routing: {
					request: {
						method: 'DELETE',
						url: '/api/v1/assets/user-assets/{{$parameter.resourceId}}/',
					},
				},
			},
			{
				name: 'Get Workspace Asset',
				value: 'getWorkspaceAsset',
				action: 'Get workspace asset',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/assets/{{$parameter.resourceId}}/',
					},
				},
			},
			{
				name: 'Update User Asset',
				value: 'updateUserAsset',
				action: 'Update user asset',
				routing: {
					request: {
						method: 'PATCH',
						url: '/api/v1/assets/user-assets/{{$parameter.resourceId}}/',
					},
				},
			},
			{
				name: 'Update Workspace Asset',
				value: 'updateWorkspaceAsset',
				action: 'Update workspace asset',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/assets/{{$parameter.resourceId}}/',
					},
				},
			},
		],
	},
	{
		...workspaceSlugField,
		displayOptions: {
			show: {
				...show,
				operation: [
					'createWorkspaceAssetUpload',
					'getWorkspaceAsset',
					'updateWorkspaceAsset',
				],
			},
		},
	},
	{
		...resourceIdField,
		displayName: 'Asset ID',
		displayOptions: {
			show: {
				...show,
				operation: [
					'updateUserAsset',
					'deleteUserAsset',
					'getWorkspaceAsset',
					'updateWorkspaceAsset',
				],
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
				operation: [
					'createUserAssetUpload',
					'updateUserAsset',
					'createWorkspaceAssetUpload',
					'updateWorkspaceAsset',
				],
			},
		},
		default: '{}',
		routing: { send: { type: 'body' } },
	},
];
