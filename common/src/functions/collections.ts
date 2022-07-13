import {
	CollectionByHandleQuery,
	CollectionByHandleQueryVariables,
	CollectionByIdQuery,
	CollectionByIdQueryVariables,
	CollectionsQuery,
	CollectionsQueryVariables,
} from '../graphql/schema';
import {
	COLLECTIONS_QUERY,
	COLLECTION_BY_HANDLE_QUERY,
	COLLECTION_BY_ID_QUERY,
} from '../queries/collection';
import type {ShopifyFetchConfig} from '../../types/index';
import {shopifyFetch as shopifyFetch_} from './fetch';

export type ResultCollectionsByIds = Array<CollectionByIdQuery['collection']>;
export const getCollectionsByIds = async (
	ids: string[],
	fetchConfig: ShopifyFetchConfig,
	shopifyFetch: typeof shopifyFetch_,
	maxProductsPerCollection = 10,
): Promise<ResultCollectionsByIds | undefined> => {
	const responses = await Promise.all(
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
	);
	const dirtyCollections = responses
		.map(response => response?.collection)
		.filter(
			(
				collection,
			): collection is NonNullable<CollectionByIdQuery['collection']> =>
				Boolean(collection),
		);

	return dirtyCollections;
};

export type ResultCollectionsByHandles = Array<
	CollectionByHandleQuery['collection']
>;
export const getCollectionsByHandles = async (
	handles: string[],
	fetchConfig: ShopifyFetchConfig,
	shopifyFetch: typeof shopifyFetch_,
	maxProductsPerCollection = 10,
): Promise<ResultCollectionsByHandles | undefined> => {
	const responses = await Promise.all(
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
	);

	const dirtyCollections = responses
		.map(response => response?.collection)
		.filter(
			(
				collection,
			): collection is NonNullable<CollectionByHandleQuery['collection']> =>
				Boolean(collection),
		);

	return dirtyCollections;
};

export type ResultCollections = Array<
	CollectionsQuery['collections']['edges'][0]['node']
>;
export const getCollections = async (
	amount: number,
	fetchConfig: ShopifyFetchConfig,
	shopifyFetch: typeof shopifyFetch_,
	maxProductsPerCollection = 10,
): Promise<ResultCollections | undefined> => {
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
	return response.collections.edges.map(({node: collection}) => collection);
};
