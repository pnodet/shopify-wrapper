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
import type {ShopifyFetchConfig, Storefront} from '@/types/index';
import { shouldNotRunMsg, shouldRun } from './lib/should-run';

const normalize = (
	response?:
		| ResultCollections
		| ResultCollectionsByHandles
		| ResultCollectionsByIds,
) => {
	if (!response) return undefined;
	if (!response) return undefined;
	const values = response.map(value => {
		if (!value) return undefined;
		return normalizeCollection(value);
	});

	return values.filter(
		(collection): collection is NonNullable<Storefront.Collection> =>
			Boolean(collection),
	);
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
				if (!shouldRun()) throw new Error(shouldNotRunMsg);
		const result = await getCollectionsByHandles(
			handles,
			config,
			shopifyFetch,
			maxProductsPerCollection,
		);
		return normalize(result);
	}

	if (ids) {
				if (!shouldRun()) throw new Error(shouldNotRunMsg);
		const result = await getCollectionsByIds(
			ids,
			config,
			shopifyFetch,
			maxProductsPerCollection,
		);
		return normalize(result);
	}

	if (amount) {
				if (!shouldRun()) throw new Error(shouldNotRunMsg);
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
