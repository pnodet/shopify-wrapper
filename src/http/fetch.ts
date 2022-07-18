import {print, DocumentNode} from 'graphql';
import fetch from 'cross-fetch';
import {FetchError} from '../errors';
import type {ShopifyFetchConfig} from '../types';

type FailResponse = {
	errors: Array<{
		message: string;
		locations: any[];
	}>;
};

type SuccessResponse<T> = {
	data: T;
};

export const shopifyFetch = async <ReturnValue, Variables>(
	query: DocumentNode,
	variables: Variables,
	{domain, token, isStorefront}: ShopifyFetchConfig,
): Promise<ReturnValue | undefined> => {
	const url = isStorefront
		? `https://${domain}/api/2022-07/graphql.json`
		: `https://${domain}/admin/api/2022-07/graphql.json`;

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
	};

	if (isStorefront) {
		headers['X-Shopify-Storefront-Access-Token'] = token;
	} else {
		headers['X-Shopify-Access-Token'] = token;
	}

	const body = JSON.stringify({
		query: print(query),
		variables,
	});

	const response = await fetch(url, {method: 'POST', headers, body});
	const {status} = response;

	if (status !== 200) {
		const body = (await response.json()) as FailResponse;
		const message = body.errors.map(({message}) => message).join(', ');
		throw new FetchError(`${status}: ${message}`);
	}

	const successResponse =
		(await response.json()) as SuccessResponse<ReturnValue>;
	return successResponse.data;
};
