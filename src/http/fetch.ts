import {print, DocumentNode} from 'graphql';
import fetch from 'cross-fetch';
import {FetchError} from '../errors';
import type {ShopifyFetchConfig} from '../types';

type FailResponse = {
	errors: Array<{
		message: string;
		locations: any[];
		path: any[];
		extensions: any;
	}>;
	data: never;
};

type SuccessResponse<T> = {
	errors: never;
	data: T;
};

type Reponse<T> = FailResponse | SuccessResponse<T>;

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

	const parsed = (await response.json()) as Reponse<ReturnValue>;

	if (status !== 200) {
		throw new FetchError(`${status}: ${parsed.errors as unknown as string}`);
	}

	if (parsed.errors) {
		const message = parsed.errors.map(({message}) => message).join(', ');
		throw new FetchError(message);
	}

	return parsed.data;
};
