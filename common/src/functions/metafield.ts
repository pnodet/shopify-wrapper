import {
	MetafieldByProductHandleQuery,
	MetafieldByProductHandleQueryVariables,
	MetafieldByProductIdQuery,
	MetafieldByProductIdQueryVariables,
} from '../graphql/schema.js';
import {
	METAFIELD_BY_PRODUCT_HANDLE_QUERY,
	METAFIELD_BY_PRODUCT_ID_QUERY,
} from '../queries/metafield';
import type {ShopifyFetchConfig} from '../../types/index';
import {shopifyFetch as shopifyFetch_} from './fetch';

export const getMetafieldByProductHandle = async (
	handle: string,
	fetchConfig: ShopifyFetchConfig,
	{namespace, key}: {namespace: string; key: string},
	shopifyFetch: typeof shopifyFetch_,
): Promise<MetafieldByProductHandleQuery | undefined> => {
	const response = await shopifyFetch<
		MetafieldByProductHandleQuery,
		MetafieldByProductHandleQueryVariables
	>(
		METAFIELD_BY_PRODUCT_HANDLE_QUERY,
		{
			handle,
			namespace,
			key,
		},
		fetchConfig,
	);

	if (!response?.product?.metafield) {
		return;
	}

	return response;
};

export const getMetafieldByProductId = async (
	id: string,
	fetchConfig: ShopifyFetchConfig,
	{namespace, key}: {namespace: string; key: string},
	shopifyFetch: typeof shopifyFetch_,
): Promise<MetafieldByProductIdQuery | undefined> => {
	const response = await shopifyFetch<
		MetafieldByProductIdQuery,
		MetafieldByProductIdQueryVariables
	>(
		METAFIELD_BY_PRODUCT_ID_QUERY,
		{
			id,
			namespace,
			key,
		},
		fetchConfig,
	);

	if (!response?.product?.metafield) {
		return;
	}

	return response;
};
