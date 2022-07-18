import {shopifyFetch} from './http';
import {
	Collection,
	CollectionByHandleQuery,
	CollectionByHandleQueryVariables,
	CollectionByIdQuery,
	CollectionByIdQueryVariables,
	CollectionsQuery,
	CollectionsQueryVariables,
} from './graphql/schema';
import {
	COLLECTIONS_QUERY,
	COLLECTION_BY_HANDLE_QUERY,
	COLLECTION_BY_ID_QUERY,
} from './graphql/queries/collection';
import {normalizeCollection} from './normalize/collection';
import type {Storefront, ShopifyFetchConfig} from './types/index';

const cleanCollections = (
	responses: Array<CollectionByIdQuery | CollectionByHandleQuery | undefined>,
) => {
	const dirtyCollections = responses
		.map(response => response?.collection)
		/* eslint-disable-next-line unicorn/prefer-native-coercion-functions */
		.filter((collection): collection is Collection => Boolean(collection));

	const collections = dirtyCollections.map(collection =>
		normalizeCollection(collection),
	);

	return collections;
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

	return response.collections.edges.map(({node: collection}) =>
		normalizeCollection(collection),
	);
};

type IdVariant = {
	ids: string[];
	config: ShopifyFetchConfig;
	maxProductsPerCollection?: number;
	handles?: never;
	amount?: never;
};

type HandleVariant = {
	handles: string[];
	config: ShopifyFetchConfig;
	maxProductsPerCollection?: number;
	ids?: never;
	amount?: never;
};

type AmountVariant = {
	amount: number;
	config: ShopifyFetchConfig;
	maxProductsPerCollection?: number;
	handles?: never;
	ids?: never;
};

type FindManyCollectionArgs = HandleVariant | IdVariant | AmountVariant;

export const findMany = async ({
	handles,
	ids,
	config,
	maxProductsPerCollection,
	amount,
}: FindManyCollectionArgs) => {
	if (handles) {
		return getCollectionsByHandles(handles, config, maxProductsPerCollection);
	}

	if (ids) {
		return getCollectionsByIds(ids, config, maxProductsPerCollection);
	}

	if (amount) {
		return getCollections(amount, config, maxProductsPerCollection);
	}

	throw new Error('provide either ids or handles');
};
