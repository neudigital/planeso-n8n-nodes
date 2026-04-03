import type { INodeProperties } from 'n8n-workflow';
import {
	cursorPagination,
	expandFieldsOrderBy,
	initiativeIdField,
	initiativeLabelIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['initiative'] };
const ws = '=/api/v1/workspaces/{{$parameter.workspaceSlug}}';

export const initiativeDescription: INodeProperties[] = [
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
				routing: {
					request: {
						method: 'POST',
						url: `${ws}/initiatives/`,
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				routing: {
					request: {
						method: 'GET',
						url: `${ws}/initiatives/`,
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				routing: {
					request: {
						method: 'GET',
						url: `${ws}/initiatives/{{$parameter.initiativeId}}/`,
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				routing: {
					request: {
						method: 'PATCH',
						url: `${ws}/initiatives/{{$parameter.initiativeId}}/`,
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				routing: {
					request: {
						method: 'DELETE',
						url: `${ws}/initiatives/{{$parameter.initiativeId}}/`,
					},
				},
			},
			{
				name: 'Create Initiative Label',
				value: 'createInitiativeLabel',
				routing: {
					request: {
						method: 'POST',
						url: `${ws}/initiatives/labels/`,
					},
				},
			},
			{
				name: 'Add Labels to Initiative',
				value: 'addLabelsToInitiative',
				routing: {
					request: {
						method: 'POST',
						url: `${ws}/initiatives/{{$parameter.initiativeId}}/labels/`,
					},
				},
			},
			{
				name: 'List Initiative Labels (Workspace)',
				value: 'listInitiativeLabelsWorkspace',
				routing: {
					request: {
						method: 'GET',
						url: `${ws}/initiatives/labels/`,
					},
				},
			},
			{
				name: 'Get Initiative Label',
				value: 'getInitiativeLabel',
				routing: {
					request: {
						method: 'GET',
						url: `${ws}/initiatives/labels/{{$parameter.initiativeLabelId}}/`,
					},
				},
			},
			{
				name: 'List Labels for Initiative',
				value: 'listLabelsForInitiative',
				routing: {
					request: {
						method: 'GET',
						url: `${ws}/initiatives/{{$parameter.initiativeId}}/labels/`,
					},
				},
			},
			{
				name: 'Update Initiative Label',
				value: 'updateInitiativeLabel',
				routing: {
					request: {
						method: 'PATCH',
						url: `${ws}/initiatives/labels/{{$parameter.initiativeLabelId}}/`,
					},
				},
			},
			{
				name: 'Remove Labels From Initiative',
				value: 'removeLabelsFromInitiative',
				routing: {
					request: {
						method: 'DELETE',
						url: `${ws}/initiatives/{{$parameter.initiativeId}}/labels/`,
					},
				},
			},
			{
				name: 'Delete Initiative Label',
				value: 'deleteInitiativeLabel',
				routing: {
					request: {
						method: 'DELETE',
						url: `${ws}/initiatives/labels/{{$parameter.initiativeLabelId}}/`,
					},
				},
			},
			{
				name: 'Add Projects',
				value: 'addProjects',
				routing: {
					request: {
						method: 'POST',
						url: `${ws}/initiatives/{{$parameter.initiativeId}}/projects/`,
					},
				},
			},
			{
				name: 'List Projects',
				value: 'listProjects',
				routing: {
					request: {
						method: 'GET',
						url: `${ws}/initiatives/{{$parameter.initiativeId}}/projects/`,
					},
				},
			},
			{
				name: 'Remove Projects',
				value: 'removeProjects',
				routing: {
					request: {
						method: 'DELETE',
						url: `${ws}/initiatives/{{$parameter.initiativeId}}/projects/`,
					},
				},
			},
			{
				name: 'Add Epics',
				value: 'addEpics',
				routing: {
					request: {
						method: 'POST',
						url: `${ws}/initiatives/{{$parameter.initiativeId}}/epics/`,
					},
				},
			},
			{
				name: 'List Epics',
				value: 'listEpics',
				routing: {
					request: {
						method: 'GET',
						url: `${ws}/initiatives/{{$parameter.initiativeId}}/epics/`,
					},
				},
			},
			{
				name: 'Remove Epics',
				value: 'removeEpics',
				routing: {
					request: {
						method: 'DELETE',
						url: `${ws}/initiatives/{{$parameter.initiativeId}}/epics/`,
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
		...initiativeIdField,
		displayOptions: {
			show: {
				...show,
				operation: [
					'get',
					'update',
					'delete',
					'addLabelsToInitiative',
					'listLabelsForInitiative',
					'removeLabelsFromInitiative',
					'addProjects',
					'listProjects',
					'removeProjects',
					'addEpics',
					'listEpics',
					'removeEpics',
				],
			},
		},
	},
	{
		...initiativeLabelIdField,
		displayOptions: {
			show: {
				...show,
				operation: ['getInitiativeLabel', 'updateInitiativeLabel', 'deleteInitiativeLabel'],
			},
		},
	},
	...cursorPagination({
		...show,
		operation: ['list', 'listInitiativeLabelsWorkspace', 'listLabelsForInitiative', 'listProjects', 'listEpics'],
	}),
	...expandFieldsOrderBy({
		...show,
		operation: ['list', 'get', 'listInitiativeLabelsWorkspace', 'getInitiativeLabel', 'listLabelsForInitiative', 'listProjects', 'listEpics'],
	}),
	{
		displayName: 'Request Body',
		name: 'requestBody',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				...show,
				operation: [
					'create',
					'update',
					'createInitiativeLabel',
					'addLabelsToInitiative',
					'updateInitiativeLabel',
					'addProjects',
					'addEpics',
				],
			},
		},
		default: '{}',
		routing: { send: { type: 'body' } },
	},
];
