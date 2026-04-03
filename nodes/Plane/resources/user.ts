import type { INodeProperties } from 'n8n-workflow';

const show = { resource: ['user'] };

export const userDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		default: 'getCurrent',
		options: [
			{
				name: 'Get Current User',
				value: 'getCurrent',
				action: 'Get the current user',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/users/me/',
					},
				},
			},
		],
	},
];
