import {Merge, RequireExactlyOne} from 'type-fest';
import {shopifyFetch} from './fetch';
import {shouldRun, errorMessage} from './lib/should-run';
import {
	MetafieldByProductHandleQuery,
	MetafieldByProductIdQuery,
} from '@/common/graphql/schema.js';
import {normalizeMetafield} from '@/common/normalize/metafield';
import type {ShopifyFetchConfig} from '@/types/index';
import {
	getMetafieldByProductHandle,
	getMetafieldByProductId,
} from '@/common/functions/metafield';

const normalize = (
	response?: MetafieldByProductIdQuery | MetafieldByProductHandleQuery,
) => {
	if (!response?.product?.metafield) return undefined;
	return normalizeMetafield(response.product.metafield);
};

type FindOptionalArgs = {
	productHandle: string;
	productId: string;
};

type FindMandatoryArgs = {
	config: ShopifyFetchConfig;
	namespace: string;
	key: string;
};

type FindCollectionArgs = Merge<
	RequireExactlyOne<FindOptionalArgs>,
	FindMandatoryArgs
>;

export const find = async ({
	productId,
	productHandle,
	config,
	namespace,
	key,
}: FindCollectionArgs) => {
	if (productHandle) {
		if (!shouldRun()) throw new Error(errorMessage);
		const result = await getMetafieldByProductHandle(
			productHandle,
			config,
			{namespace, key},
			shopifyFetch,
		);

		return normalize(result);
	}

	if (productId) {
		if (!shouldRun()) throw new Error(errorMessage);
		const result = await getMetafieldByProductId(
			productId,
			config,
			{namespace, key},
			shopifyFetch,
		);
		return normalize(result);
	}

	throw new Error('provide either productId or productHandle');
};
