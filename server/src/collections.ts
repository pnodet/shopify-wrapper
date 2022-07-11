import type {Merge, RequireExactlyOne} from 'type-fest';
import {shopifyFetch} from './fetch';
import {normalizeCollection} from './lib/collection';
import {
	CollectionByHandleQuery,
	CollectionByHandleQueryVariables,
	CollectionByIdQuery,
	CollectionByIdQueryVariables,
	CollectionsQuery,
	CollectionsQueryVariables,
} from '@/common/schema';
import {
	COLLECTIONS_QUERY,
	COLLECTION_BY_HANDLE_QUERY,
	COLLECTION_BY_ID_QUERY,
} from '@/common/queries/collection';

import type {Storefront, ShopifyFetchConfig} from '@/types/index';

const cleanCollections = async (
	responses: Array<CollectionByIdQuery | CollectionByHandleQuery | undefined>,
) => {
	const dirtyCollections = responses
		.map(response => response?.collection)
		.filter(
			(
				collection,
			): collection is NonNullable<CollectionByIdQuery['collection']> =>
				Boolean(collection),
		);

	const promises = dirtyCollections.map(async collection =>
		normalizeCollection(collection),
	);
	return Promise.all(promises);
};

const getCollectionsByIds = async (
	ids: string[],
	fetchConfig: ShopifyFetchConfig,
	maxProductsPerCollection = 10,
): Promise<Storefront.Collection[] | undefined> =>
	cleanCollections(
		await Promise.all(
			ids.map(async id =>
				shopifyFetch<CollectionByIdQuery, CollectionByIdQueryVariables>(
					COLLECTION_BY_ID_QUERY,
					{
						id,
						maxProductsPerCollection,
					},
					fetchConfig,
				),
			),
		),
	);

const getCollectionsByHandles = async (
	handles: string[],
	fetchConfig: ShopifyFetchConfig,
	maxProductsPerCollection = 10,
): Promise<Storefront.Collection[] | undefined> =>
	cleanCollections(
		await Promise.all(
			handles.map(async handle =>
				shopifyFetch<CollectionByHandleQuery, CollectionByHandleQueryVariables>(
					COLLECTION_BY_HANDLE_QUERY,
					{
						handle,
						maxProductsPerCollection,
					},
					fetchConfig,
				),
			),
		),
	);

const getCollections = async (
	amount: number,
	fetchConfig: ShopifyFetchConfig,
	maxProductsPerCollection = 10,
): Promise<Storefront.Collection[] | undefined> => {
	const response = await shopifyFetch<
		CollectionsQuery,
		CollectionsQueryVariables
	>(
		COLLECTIONS_QUERY,
		{
			first: amount,
			maxProductsPerCollection,
		},
		fetchConfig,
	);

	if (!response) return [];

	const promises = response.collections.edges.map(async ({node: collection}) =>
		normalizeCollection(collection),
	);

	return Promise.all(promises);
};

type FindOptionalArgs = {
	handles: string[];
	ids: string[];
	amount: number;
};
type FindMandatoryArgs = {
	config: ShopifyFetchConfig;
	maxProductsPerCollection?: number;
};

type FindCollectionArgs = Merge<
	RequireExactlyOne<FindOptionalArgs>,
	FindMandatoryArgs
>;

export const findMany = async ({
	ids,
	handles,
	amount,
	config,
	maxProductsPerCollection,
}: FindCollectionArgs) => {
	if (handles)
		return getCollectionsByHandles(handles, config, maxProductsPerCollection);
	if (ids) return getCollectionsByIds(ids, config, maxProductsPerCollection);
	if (amount) return getCollections(amount, config, maxProductsPerCollection);
	throw new Error('provide either ids or handles');
};
