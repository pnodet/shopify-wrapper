import {
	CollectionByHandleQuery,
	CollectionByHandleQueryVariables,
	CollectionByIdQuery,
	CollectionByIdQueryVariables,
} from '../graphql/schema';
import {
	COLLECTION_BY_HANDLE_QUERY,
	COLLECTION_BY_ID_QUERY,
} from '../queries/collection';
import type {ShopifyFetchConfig} from '../../types/index';
import {shopifyFetch as shopifyFetch_} from './fetch';

export const getCollectionByHandle = async (
	handle: string,
	fetchConfig: ShopifyFetchConfig,
	shopifyFetch: typeof shopifyFetch_,
	maxProductsPerCollection = 10,
): Promise<CollectionByHandleQuery | undefined> => {
	const response = await shopifyFetch<
		CollectionByHandleQuery,
		CollectionByHandleQueryVariables
	>(
		COLLECTION_BY_HANDLE_QUERY,
		{
			handle,
			maxProductsPerCollection,
		},
		fetchConfig,
	);

	if (!response?.collection) {
		return;
	}

	return response;
};

export const getCollectionById = async (
	id: string,
	fetchConfig: ShopifyFetchConfig,
	shopifyFetch: typeof shopifyFetch_,
	maxProductsPerCollection = 10,
): Promise<CollectionByIdQuery | undefined> => {
	const response = await shopifyFetch<
		CollectionByIdQuery,
		CollectionByIdQueryVariables
	>(
		COLLECTION_BY_ID_QUERY,
		{
			id,
			maxProductsPerCollection,
		},
		fetchConfig,
	);

	if (!response?.collection) {
		return;
	}

	return response;
};
