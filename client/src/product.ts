import {Merge, RequireExactlyOne} from 'type-fest';
import {shopifyFetch} from './fetch';
import {ProductByHandleQuery, ProductByIdQuery} from '@/common/graphql/schema';
import type {Storefront, ShopifyFetchConfig} from '@/types/index';
import {normalizeProduct} from '@/common/normalize/product';
import {getProductByHandle, getProductById} from '@/common/functions/product';

const normalize = (
	response?: ProductByHandleQuery | ProductByIdQuery,
): Storefront.Product | undefined => {
	if (!response?.product) return undefined;
	return normalizeProduct(response.product);
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
		const result = await getProductByHandle(handle, config, shopifyFetch);
		return normalize(result);
	}

	if (id) {
		const result = await getProductById(id, config, shopifyFetch);
		return normalize(result);
	}

	throw new Error('provide either id or handle');
};
