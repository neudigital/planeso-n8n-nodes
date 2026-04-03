import type {
	IDataObject,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
} from 'n8n-workflow';

const PLANE_CREDENTIAL = 'planeApi';

export async function planeApiRequest(
	this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	url: string,
	qs: IDataObject = {},
	body: IDataObject | undefined = undefined,
): Promise<unknown> {
	const options: IHttpRequestOptions = {
		method,
		url,
		qs,
		body,
		json: true,
	};
	return this.helpers.httpRequestWithAuthentication.call(this, PLANE_CREDENTIAL, options);
}
