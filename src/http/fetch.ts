import {print, DocumentNode} from 'graphql';
import fetch from 'cross-fetch';
import {FetchError} from 'src/errors/fetch';
import type {ShopifyFetchConfig} from '../types/index';

type ResponseError = {
	errors: Array<{
		message: string;
		locations: any[];
	}>;
};

export const shopifyFetch = async <ReturnValue, Variables>(
	query: DocumentNode,
	variables: Variables,
	{domain, token, isStorefront}: ShopifyFetchConfig,
): Promise<ReturnValue | undefined> => {
	type ReponseValue = {data?: ReturnValue};

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
		const body = (await response.json()) as ResponseError;
		const message = body.errors.map(({message}) => message).join(', ');
		throw new FetchError(`${status}: ${message}`);
	}

	const data = (await response.json()) as ReponseValue;
	console.log('response', data);

	const returnValue = data;
	return returnValue?.data ?? undefined;
};
