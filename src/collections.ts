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
} from './graphql/queries';
import {normalizeCollection} from './normalize';
import type {Storefront, ShopifyFetchConfig} from './types';
import {ValidationError} from './errors';
import {
	amountParser,
	configParser,
	handlesParser,
	idsParser,
} from './validation';

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
	productsAmount = 10,
): Promise<Storefront.Collection[] | undefined> =>
	cleanCollections(
		await Promise.all(
			ids.map(async id =>
				shopifyFetch<CollectionByIdQuery, CollectionByIdQueryVariables>(
					COLLECTION_BY_ID_QUERY,
					{
						id,
						productsAmount,
					},
					fetchConfig,
				),
			),
		),
	);

const getCollectionsByHandles = async (
	handles: string[],
	fetchConfig: ShopifyFetchConfig,
	productsAmount = 10,
): Promise<Storefront.Collection[] | undefined> =>
	cleanCollections(
		await Promise.all(
			handles.map(async handle =>
				shopifyFetch<CollectionByHandleQuery, CollectionByHandleQueryVariables>(
					COLLECTION_BY_HANDLE_QUERY,
					{
						handle,
						productsAmount,
					},
					fetchConfig,
				),
			),
		),
	);

const getCollections = async (
	amount: number,
	fetchConfig: ShopifyFetchConfig,
	productsAmount = 10,
): Promise<Storefront.Collection[] | undefined> => {
	const response = await shopifyFetch<
		CollectionsQuery,
		CollectionsQueryVariables
	>(
		COLLECTIONS_QUERY,
		{
			first: amount,
			productsAmount,
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
	productsAmount?: number;
	handles?: never;
	amount?: never;
};

type HandleVariant = {
	handles: string[];
	config: ShopifyFetchConfig;
	productsAmount?: number;
	ids?: never;
	amount?: never;
};

type AmountVariant = {
	amount: number;
	config: ShopifyFetchConfig;
	productsAmount?: number;
	handles?: never;
	ids?: never;
};

type FindManyCollectionArgs = HandleVariant | IdVariant | AmountVariant;

export const findMany = async ({
	handles,
	ids,
	config,
	productsAmount,
	amount,
}: FindManyCollectionArgs) => {
	configParser.parse(config);

	if (handles !== undefined) {
		if (ids || amount)
			throw new ValidationError('Provide either ids, handles or amount');
		handlesParser.parse(handles);
		return getCollectionsByHandles(handles, config, productsAmount);
	}

	if (ids !== undefined) {
		if (handles || amount)
			throw new ValidationError('Provide either ids, handles or amount');
		idsParser.parse(ids);
		return getCollectionsByIds(ids, config, productsAmount);
	}

	if (amount !== undefined) {
		if (handles || ids)
			throw new ValidationError('Provide either ids, handles or amount');
		amountParser.parse(amount);
		return getCollections(amount, config, productsAmount);
	}

	throw new ValidationError('Provide either ids, handles or amount');
};
