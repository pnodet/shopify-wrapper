import type {Merge, RequireExactlyOne} from 'type-fest';
import {shopifyFetch} from './fetch';
import {normalizeCollection} from '@/common/normalize/collection';
import {
	getCollections,
	getCollectionsByHandles,
	getCollectionsByIds,
	ResultCollections,
	ResultCollectionsByHandles,
	ResultCollectionsByIds,
} from '@/common/functions/collections';
import type {ShopifyFetchConfig} from '@/types/index';

const normalize = (
	response?:
		| ResultCollections
		| ResultCollectionsByHandles
		| ResultCollectionsByIds,
) => {
	if (!response) return undefined;
	return response.map(value => normalizeCollection(value));
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
	if (handles) {
		const result = await getCollectionsByHandles(
			handles,
			config,
			shopifyFetch,
			maxProductsPerCollection,
		);
		return normalize(result);
	}

	if (ids) {
		const result = await getCollectionsByIds(
			ids,
			config,
			shopifyFetch,
			maxProductsPerCollection,
		);
		return normalize(result);
	}

	if (amount) {
		const result = await getCollections(
			amount,
			config,
			shopifyFetch,
			maxProductsPerCollection,
		);
		return normalize(result);
	}

	throw new Error('provide either ids or handles');
};
