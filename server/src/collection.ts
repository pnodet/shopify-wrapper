import {Merge, RequireExactlyOne} from 'type-fest';
import {
	CollectionByHandleQuery,
	CollectionByIdQuery,
} from '@/common/graphql/schema';
import {shopifyFetch} from './fetch';
import {
	getCollectionByHandle,
	getCollectionById,
} from '@/common/functions/collection';
import type {ShopifyFetchConfig} from '@/types/index';
import {normalizeCollection} from './lib/collection';

const normalize = (
	response?: CollectionByHandleQuery | CollectionByIdQuery,
) => {
	if (!response?.collection) return undefined;
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
	if (handle) {
		 const result = await getCollectionByHandle(handle, config, shopifyFetch)
		 return normalize(result);
	}

	if (id) {
		const result = await getCollectionById(id, config, shopifyFetch)
		return normalize(result);
	}

	throw new Error('provide either id or handle');
};
