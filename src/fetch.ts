import {print, DocumentNode} from 'graphql';
import fetch from 'cross-fetch';
import type {ShopifyFetchConfig} from './types/index';

export const shopifyFetch = async <ReturnValue, Variables>(
	query: DocumentNode,
	variables: Variables,
	{domain, token, isStorefront}: ShopifyFetchConfig,
): Promise<ReturnValue | undefined> => {
	type ReponseValue = {data?: ReturnValue};

	const url = isStorefront
		? `https://${domain}/api/2022-07/graphql.json`
		: `https://${domain}/admin/api/2022-07/graphql.json`;

	const headers: Record<string, string> = {'Content-Type': 'application/json'};

	if (isStorefront) {
		headers['X-Shopify-Storefront-Access-Token'] = token;
	} else {
		headers['X-Shopify-Access-Token'] = token;
	}

	const response = await fetch(url, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			query: print(query),
			variables,
		}),
	});

	const returnValue = (await response.json()) as ReponseValue;
	return returnValue?.data ?? undefined;
};
