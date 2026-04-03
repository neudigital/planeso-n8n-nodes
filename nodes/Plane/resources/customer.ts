import type { INodeProperties } from 'n8n-workflow';
import {
	cursorPagination,
	customerIdField,
	expandFieldsOrderBy,
	propertyIdField,
	requestIdField,
	workItemIdField,
	workspaceSlugField,
} from '../shared/descriptions';

const show = { resource: ['customer'] };
const ws = '=/api/v1/workspaces/{{$parameter.workspaceSlug}}';

export const customerDescription: INodeProperties[] = [
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
				routing: { request: { method: 'POST', url: `${ws}/customers/` } },
			},
			{
				name: 'List',
				value: 'list',
				routing: { request: { method: 'GET', url: `${ws}/customers/` } },
			},
			{
				name: 'Get',
				value: 'get',
				routing: {
					request: { method: 'GET', url: `${ws}/customers/{{$parameter.customerId}}/` },
				},
			},
			{
				name: 'Update',
				value: 'update',
				routing: {
					request: { method: 'PATCH', url: `${ws}/customers/{{$parameter.customerId}}/` },
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				routing: {
					request: { method: 'DELETE', url: `${ws}/customers/{{$parameter.customerId}}/` },
				},
			},
			{
				name: 'Link Work Items',
				value: 'linkWorkItems',
				routing: {
					request: {
						method: 'POST',
						url: `${ws}/customers/{{$parameter.customerId}}/issues/`,
					},
				},
			},
			{
				name: 'List Work Items',
				value: 'listWorkItems',
				routing: {
					request: {
						method: 'GET',
						url: `${ws}/customers/{{$parameter.customerId}}/issues/`,
					},
				},
			},
			{
				name: 'Unlink Work Item',
				value: 'unlinkWorkItem',
				routing: {
					request: {
						method: 'DELETE',
						url: `${ws}/customers/{{$parameter.customerId}}/issues/{{$parameter.workItemId}}/`,
					},
				},
			},
			{
				name: 'Create Property',
				value: 'createProperty',
				routing: {
					request: { method: 'POST', url: `${ws}/customer-properties/` },
				},
			},
			{
				name: 'List Properties',
				value: 'listProperties',
				routing: {
					request: { method: 'GET', url: `${ws}/customer-properties/` },
				},
			},
			{
				name: 'Get Property',
				value: 'getProperty',
				routing: {
					request: {
						method: 'GET',
						url: `${ws}/customer-properties/{{$parameter.propertyId}}/`,
					},
				},
			},
			{
				name: 'List Property Values',
				value: 'listPropertyValues',
				routing: {
					request: {
						method: 'GET',
						url: `${ws}/customer-properties/{{$parameter.propertyId}}/values/`,
					},
				},
			},
			{
				name: 'Get Property Value',
				value: 'getPropertyValue',
				routing: {
					request: {
						method: 'GET',
						url: `${ws}/customer-properties/{{$parameter.propertyId}}/values/{{$parameter.resourceId}}/`,
					},
				},
			},
			{
				name: 'Update Property',
				value: 'updateProperty',
				routing: {
					request: {
						method: 'PATCH',
						url: `${ws}/customer-properties/{{$parameter.propertyId}}/`,
					},
				},
			},
			{
				name: 'Update Property Value',
				value: 'updatePropertyValue',
				routing: {
					request: {
						method: 'PATCH',
						url: `${ws}/customer-properties/{{$parameter.propertyId}}/values/{{$parameter.resourceId}}/`,
					},
				},
			},
			{
				name: 'Delete Property',
				value: 'deleteProperty',
				routing: {
					request: {
						method: 'DELETE',
						url: `${ws}/customer-properties/{{$parameter.propertyId}}/`,
					},
				},
			},
			{
				name: 'Create Request',
				value: 'createRequest',
				routing: {
					request: {
						method: 'POST',
						url: `${ws}/customers/{{$parameter.customerId}}/requests/`,
					},
				},
			},
			{
				name: 'List Requests',
				value: 'listRequests',
				routing: {
					request: {
						method: 'GET',
						url: `${ws}/customers/{{$parameter.customerId}}/requests/`,
					},
				},
			},
			{
				name: 'Get Request',
				value: 'getRequest',
				routing: {
					request: {
						method: 'GET',
						url: `${ws}/customers/{{$parameter.customerId}}/requests/{{$parameter.requestId}}/`,
					},
				},
			},
			{
				name: 'Update Request',
				value: 'updateRequest',
				routing: {
					request: {
						method: 'PATCH',
						url: `${ws}/customers/{{$parameter.customerId}}/requests/{{$parameter.requestId}}/`,
					},
				},
			},
			{
				name: 'Delete Request',
				value: 'deleteRequest',
				routing: {
					request: {
						method: 'DELETE',
						url: `${ws}/customers/{{$parameter.customerId}}/requests/{{$parameter.requestId}}/`,
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
		...customerIdField,
		displayOptions: {
			show: {
				...show,
				operation: [
					'get',
					'update',
					'delete',
					'linkWorkItems',
					'listWorkItems',
					'unlinkWorkItem',
					'createRequest',
					'listRequests',
					'getRequest',
					'updateRequest',
					'deleteRequest',
				],
			},
		},
	},
	{
		...workItemIdField,
		displayOptions: {
			show: {
				...show,
				operation: ['unlinkWorkItem'],
			},
		},
	},
	{
		...propertyIdField,
		displayOptions: {
			show: {
				...show,
				operation: [
					'getProperty',
					'listPropertyValues',
					'getPropertyValue',
					'updateProperty',
					'updatePropertyValue',
					'deleteProperty',
				],
			},
		},
	},
	{
		displayName: 'Property Value ID',
		name: 'resourceId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				...show,
				operation: ['getPropertyValue', 'updatePropertyValue'],
			},
		},
		description: 'ID of the property value',
	},
	{
		...requestIdField,
		displayOptions: {
			show: {
				...show,
				operation: ['getRequest', 'updateRequest', 'deleteRequest'],
			},
		},
	},
	...cursorPagination({
		...show,
		operation: ['list', 'listWorkItems', 'listProperties', 'listPropertyValues', 'listRequests'],
	}),
	...expandFieldsOrderBy({
		...show,
		operation: [
			'list',
			'get',
			'listWorkItems',
			'listProperties',
			'getProperty',
			'listPropertyValues',
			'getPropertyValue',
			'listRequests',
			'getRequest',
		],
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
					'linkWorkItems',
					'createProperty',
					'updateProperty',
					'updatePropertyValue',
					'createRequest',
					'updateRequest',
				],
			},
		},
		default: '{}',
		routing: { send: { type: 'body' } },
	},
];
