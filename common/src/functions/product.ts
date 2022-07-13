import {PRODUCT_BY_HANDLE_QUERY, PRODUCT_BY_ID_QUERY} from '../queries/product';
import {
	ProductByHandleQuery,
	ProductByHandleQueryVariables,
	ProductByIdQuery,
	ProductByIdQueryVariables,
} from '../graphql/schema';
import type {ShopifyFetchConfig} from '../../types/index';
import {shopifyFetch as shopifyFetch_} from './fetch';

export const getProductByHandle = async (
	handle: string,
	fetchConfig: ShopifyFetchConfig,
	shopifyFetch: typeof shopifyFetch_,
): Promise<ProductByHandleQuery | undefined> => {
	const response = await shopifyFetch<
		ProductByHandleQuery,
		ProductByHandleQueryVariables
	>(
		PRODUCT_BY_HANDLE_QUERY,
		{
			handle,
		},
		fetchConfig,
	);

	if (!response?.product) {
		return;
	}

	return response;
};

export const getProductById = async (
	id: string,
	fetchConfig: ShopifyFetchConfig,
	shopifyFetch: typeof shopifyFetch_,
): Promise<ProductByIdQuery | undefined> => {
	const response = await shopifyFetch<
		ProductByIdQuery,
		ProductByIdQueryVariables
	>(
		PRODUCT_BY_ID_QUERY,
		{
			id,
		},
		fetchConfig,
	);

	if (!response?.product) {
		return;
	}

	return response;
};
