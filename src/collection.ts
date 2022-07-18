import {shopifyFetch} from './http';
import {
	CollectionByHandleQuery,
	CollectionByHandleQueryVariables,
	CollectionByIdQuery,
	CollectionByIdQueryVariables,
} from './graphql/schema';
import {normalizeCollection} from './normalize';
import {
	COLLECTION_BY_HANDLE_QUERY,
	COLLECTION_BY_ID_QUERY,
} from './graphql/queries';
import type {Storefront, ShopifyFetchConfig} from './types';
import {ValidationError} from './errors';
import {configParser, handleParser, idParser} from './validation';

export const getCollectionByHandle = async (
	handle: string,
	fetchConfig: ShopifyFetchConfig,
	productsAmount = 10,
): Promise<Storefront.Collection | undefined> => {
	const response = await shopifyFetch<
		CollectionByHandleQuery,
		CollectionByHandleQueryVariables
	>(
		COLLECTION_BY_HANDLE_QUERY,
		{
			handle,
			productsAmount,
		},
		fetchConfig,
	);

	if (!response?.collection) {
		return;
	}

	return normalizeCollection(response.collection);
};

export const getCollectionById = async (
	id: string,
	fetchConfig: ShopifyFetchConfig,
	productsAmount = 10,
): Promise<Storefront.Collection | undefined> => {
	const response = await shopifyFetch<
		CollectionByIdQuery,
		CollectionByIdQueryVariables
	>(
		COLLECTION_BY_ID_QUERY,
		{
			id,
			productsAmount,
		},
		fetchConfig,
	);

	if (!response?.collection) {
		return;
	}

	return normalizeCollection(response.collection);
};

type IdVariant = {
	id: string;
	config: ShopifyFetchConfig;
	handle?: never;
};

type HandleVariant = {
	handle: string;
	config: ShopifyFetchConfig;
	id?: never;
};

type FindCollectionArgs = IdVariant | HandleVariant;

export const find = async ({id, handle, config}: FindCollectionArgs) => {
	configParser.parse(config);

	if (handle) {
		handleParser.parse(handle);
		return getCollectionByHandle(handle, config);
	}

	if (id) {
		idParser.parse(id);
		return getCollectionById(id, config);
	}

	throw new ValidationError('provide either id or handle');
};
