import {shopifyFetch} from './http';
import {
	CollectionByHandleQuery,
	CollectionByHandleQueryVariables,
	CollectionByIdQuery,
	CollectionByIdQueryVariables,
} from './graphql/schema';
import {normalizeCollection} from './normalize/collection';
import {
	COLLECTION_BY_HANDLE_QUERY,
	COLLECTION_BY_ID_QUERY,
} from './graphql/queries/collection';
import {Storefront, configParser, ShopifyFetchConfig} from './types';
import {ValidationError} from './errors/validation';

export const getCollectionByHandle = async (
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

	if (!response?.collection) {
		return;
	}

	return normalizeCollection(response.collection);
};

export const getCollectionById = async (
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
		return getCollectionByHandle(handle, config);
	}

	if (id) {
		return getCollectionById(id, config);
	}

	throw new ValidationError('provide either id or handle');
};
