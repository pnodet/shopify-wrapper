import {Merge, RequireExactlyOne} from 'type-fest';
import {
	MetafieldByProductHandleQuery,
	MetafieldByProductIdQuery,
	MetafieldsByProductHandleQueryVariables,
	MetafieldsByProductIdQueryVariables,
} from '../common/common/schema.js';
import {shopifyFetch} from './fetch';
import {normalizeMetafield} from '@/common/normalize/metafield';
import {
	METAFIELDS_BY_PRODUCT_HANDLE_QUERY,
	METAFIELDS_BY_PRODUCT_ID_QUERY,
} from '@/common/queries/metafield';
import type {Storefront, ShopifyFetchConfig} from '@/types/index';

const getMetafieldsByProductHandle = async (
	handle: string,
	fetchConfig: ShopifyFetchConfig,
	amount = 10,
): Promise<Storefront.Metafield | undefined> => {
	const response = await shopifyFetch<
		MetafieldByProductHandleQuery,
		MetafieldsByProductHandleQueryVariables
	>(
		METAFIELDS_BY_PRODUCT_HANDLE_QUERY,
		{
			handle,
			amount,
		},
		fetchConfig,
	);

	if (!response?.product?.metafield) return;
	return normalizeMetafield(response.product.metafield);
};

const getMetafieldsByProductId = async (
	id: string,
	fetchConfig: ShopifyFetchConfig,
	amount = 10,
): Promise<Storefront.Metafield | undefined> => {
	const response = await shopifyFetch<
		MetafieldByProductIdQuery,
		MetafieldsByProductIdQueryVariables
	>(
		METAFIELDS_BY_PRODUCT_ID_QUERY,
		{
			id,
			amount,
		},
		fetchConfig,
	);

	if (!response?.product?.metafield) return;
	return normalizeMetafield(response.product.metafield);
};

type FindOptionalArgs = {
	productHandle: string;
	productId: string;
};

type FindMandatoryArgs = {
	config: ShopifyFetchConfig;
	amount?: number;
};

type FindCollectionArgs = Merge<
	RequireExactlyOne<FindOptionalArgs>,
	FindMandatoryArgs
>;

export const find = async ({
	productId,
	productHandle,
	config,
	amount,
}: FindCollectionArgs) => {
	if (productHandle)
		return getMetafieldsByProductHandle(productHandle, config, amount);
	if (productId) return getMetafieldsByProductId(productId, config, amount);
	throw new Error('provide either productId or productHandle');
};
