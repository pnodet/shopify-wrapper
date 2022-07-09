import {shopifyFetch} from './fetch';
import {
	PRODUCT_BY_HANDLE_QUERY,
	PRODUCT_BY_ID_QUERY,
} from '@/common/queries/product';
import {
	ProductByHandleQuery,
	ProductByHandleQueryVariables,
	ProductByIdQuery,
	ProductByIdQueryVariables,
} from '@/common/schema';
import type {Storefront, ShopifyFetchConfig} from '@/types/index';
import {normalizeProduct} from '@/common/normalize/product';

const getProductByHandle = async (
	handle: string,
	fetchConfig: ShopifyFetchConfig
): Promise<Storefront.Product | undefined> => {
	const res = await shopifyFetch<
		ProductByHandleQuery,
		ProductByHandleQueryVariables
	>(
		PRODUCT_BY_HANDLE_QUERY,
		{
			handle,
		},
		fetchConfig
	);

	if (!res?.product) return;
	return normalizeProduct(res.product);
};

const getProductById = async (
	id: string,
	fetchConfig: ShopifyFetchConfig
): Promise<Storefront.Product | undefined> => {
	const res = await shopifyFetch<ProductByIdQuery, ProductByIdQueryVariables>(
		PRODUCT_BY_ID_QUERY,
		{
			id,
		},
		fetchConfig
	);

	if (!res?.product) return;
	return normalizeProduct(res.product);
};

export const getProduct = {
	byHandle: getProductByHandle,
	byId: getProductById,
};
