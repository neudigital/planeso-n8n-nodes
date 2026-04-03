import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class PlaneApi implements ICredentialType {
	name = 'planeApi';

	displayName = 'Plane API';

	icon: Icon = {
		light: 'file:../nodes/Plane/plane.svg',
		dark: 'file:../nodes/Plane/plane-dark.svg',
	};

	documentationUrl = 'https://developers.plane.so/api-reference/introduction';

	properties: INodeProperties[] = [
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.plane.so',
			placeholder: 'https://api.plane.so',
			description:
				'Plane API base URL. Use https://api.plane.so for Plane Cloud, or your self-hosted API root.',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Personal access token or API key (X-API-Key header)',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/v1/users/me/',
			method: 'GET',
		},
	};
}
