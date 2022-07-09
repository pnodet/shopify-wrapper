import {shopifyFetch} from './fetch';
import {
	CollectionByHandleQuery,
	CollectionByHandleQueryVariables,
	CollectionByIdQuery,
	CollectionByIdQueryVariables,
} from '@/common/schema';
import {
	COLLECTION_BY_HANDLE_QUERY,
	COLLECTION_BY_ID_QUERY,
} from '@/common/queries/collection';
import {normalizeCollection} from '@/common/normalize/collection';
import type {Storefront, ShopifyFetchConfig} from '@/types/index';

export const getCollectionByHandle = async (
	handle: string,
	fetchConfig: ShopifyFetchConfig,
	maxProductsPerCollection = 10
): Promise<Storefront.Collection | undefined> => {
	const res = await shopifyFetch<
		CollectionByHandleQuery,
		CollectionByHandleQueryVariables
	>(
		COLLECTION_BY_HANDLE_QUERY,
		{
			handle,
			maxProductsPerCollection,
		},
		fetchConfig
	);

	if (!res?.collection) return;
	return normalizeCollection(res.collection);
};

export const getCollectionById = async (
	id: string,
	fetchConfig: ShopifyFetchConfig,
	maxProductsPerCollection = 10
): Promise<Storefront.Collection | undefined> => {
	const res = await shopifyFetch<
		CollectionByIdQuery,
		CollectionByIdQueryVariables
	>(
		COLLECTION_BY_ID_QUERY,
		{
			id,
			maxProductsPerCollection,
		},
		fetchConfig
	);

	if (!res?.collection) return;
	return normalizeCollection(res.collection);
};

export const getCollection = {
	byHandle: getCollectionByHandle,
	byId: getCollectionById,
};
