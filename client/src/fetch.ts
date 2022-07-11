import {print, DocumentNode} from 'graphql';
import type {ShopifyFetchConfig} from '@/types/index';

export const shopifyFetch = async <ReturnValue, Variables>(
	query: DocumentNode,
	variables: Variables,
	fetchConfig: ShopifyFetchConfig,
): Promise<ReturnValue | undefined> => {
	type ReponseValue = {data?: ReturnValue};
	const {domain, token} = fetchConfig;
	const response = await fetch(`https://${domain}/api/2022-04/graphql.json`, {
		method: 'POST',
		headers: {
			'X-Shopify-Storefront-Access-Token': token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: print(query),
			variables,
		}),
	});

	const returnValue = (await response.json()) as ReponseValue;
	return returnValue?.data ?? undefined;
};
