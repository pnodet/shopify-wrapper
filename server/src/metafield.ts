import {
	MetafieldByProductHandleQuery,
	MetafieldByProductHandleQueryVariables,
	MetafieldByProductIdQuery,
	MetafieldByProductIdQueryVariables,
} from '@/common/schema.js';
import {normalizeMetafield} from '@/common/normalize/metafield';
import {
	METAFIELD_BY_PRODUCT_HANDLE_QUERY,
	METAFIELD_BY_PRODUCT_ID_QUERY,
} from '@/common/queries/metafield';
import type {Storefront, ShopifyFetchConfig} from '@/types/index';
import {shopifyFetch} from './fetch';

export const getMetafieldByProductHandle = async (
	handle: string,
	fetchConfig: ShopifyFetchConfig,
	namespace: string,
	key: string
): Promise<Storefront.Metafield | undefined> => {
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
		fetchConfig
	);

	if (!response?.product?.metafield) return;
	return normalizeMetafield(response.product.metafield);
};

export const getMetafieldByProductId = async (
	id: string,
	fetchConfig: ShopifyFetchConfig,
	namespace: string,
	key: string
): Promise<Storefront.Metafield | undefined> => {
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
		fetchConfig
	);

	if (!response?.product?.metafield) return;
	return normalizeMetafield(response.product.metafield);
};
