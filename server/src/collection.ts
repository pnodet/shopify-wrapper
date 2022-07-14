import {Merge, RequireExactlyOne} from 'type-fest';
import {shopifyFetch} from './fetch';
import {normalizeCollection} from './lib/collection';
import {errorMessage, shouldRun} from './lib/should-run';
import {
	CollectionByHandleQuery,
	CollectionByIdQuery,
} from '@/common/graphql/schema';
import {
	getCollectionByHandle,
	getCollectionById,
} from '@/common/functions/collection';
import type {ShopifyFetchConfig} from '@/types/index';

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
		if (!shouldRun()) throw new Error(errorMessage);
		const result = await getCollectionByHandle(handle, config, shopifyFetch);
		return normalize(result);
	}

	if (id) {
		if (!shouldRun()) throw new Error(errorMessage);
		const result = await getCollectionById(id, config, shopifyFetch);
		return normalize(result);
	}

	throw new Error('provide either id or handle');
};
