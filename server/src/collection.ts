import type {Merge, RequireExactlyOne} from 'type-fest';
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

const getCollectionById = async (
	id: string,
	fetchConfig: ShopifyFetchConfig,
	maxProductsPerCollection = 10,
): Promise<Storefront.Collection | undefined> => {
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

	if (!response?.collection) return;
	return normalizeCollection(response.collection);
};

const getCollectionByHandle = async (
	handle: string,
	fetchConfig: ShopifyFetchConfig,
	maxProductsPerCollection = 10,
): Promise<Storefront.Collection | undefined> => {
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

	if (!response?.collection) return;
	return normalizeCollection(response.collection);
};

type FindOptionalArgs = {
	handle: string;
	id: string;
};
type FindMandatoryArgs = {config: ShopifyFetchConfig};

type FindCollectionArgs = Merge<
	RequireExactlyOne<FindOptionalArgs>,
	FindMandatoryArgs
>;

export const find = async ({id, handle, config}: FindCollectionArgs) => {
	if (handle) return getCollectionByHandle(handle, config);
	if (id) return getCollectionById(id, config);
	throw new Error('provide either id or handle');
};
