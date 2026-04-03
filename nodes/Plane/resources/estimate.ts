import type { INodeProperties } from 'n8n-workflow';
import {
	estimateIdField,
	pointIdField,
	projectIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['estimate'] };
const estBase =
	'=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/estimates/{{$parameter.estimateId}}';

export const estimateDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		default: 'create',
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create estimate',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/v1/workspaces/{{$parameter.workspaceSlug}}/projects/{{$parameter.projectId}}/estimates/',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get estimate',
				routing: {
					request: {
						method: 'GET',
						url: `${estBase}/`,
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update estimate',
				routing: {
					request: {
						method: 'PATCH',
						url: `${estBase}/`,
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete estimate',
				routing: {
					request: {
						method: 'DELETE',
						url: `${estBase}/`,
					},
				},
			},
			{
				name: 'List Points',
				value: 'listPoints',
				action: 'List estimate points',
				routing: {
					request: {
						method: 'GET',
						url: `${estBase}/points/`,
					},
				},
			},
			{
				name: 'Create Point',
				value: 'createPoint',
				action: 'Create estimate point',
				routing: {
					request: {
						method: 'POST',
						url: `${estBase}/points/`,
					},
				},
			},
			{
				name: 'Update Point',
				value: 'updatePoint',
				action: 'Update estimate point',
				routing: {
					request: {
						method: 'PATCH',
						url: `${estBase}/points/{{$parameter.pointId}}/`,
					},
				},
			},
			{
				name: 'Delete Point',
				value: 'deletePoint',
				action: 'Delete estimate point',
				routing: {
					request: {
						method: 'DELETE',
						url: `${estBase}/points/{{$parameter.pointId}}/`,
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
		...estimateIdField,
		displayOptions: {
			show: {
				...show,
				operation: [
					'get',
					'update',
					'delete',
					'listPoints',
					'createPoint',
					'updatePoint',
					'deletePoint',
				],
			},
		},
		description: 'Required for all operations except Create',
	},
	{
		...pointIdField,
		displayOptions: {
			show: {
				...show,
				operation: ['updatePoint', 'deletePoint'],
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
				operation: ['create', 'update', 'createPoint', 'updatePoint'],
			},
		},
		default: '{}',
		routing: { send: { type: 'body' } },
	},
];
