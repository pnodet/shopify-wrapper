import type {Merge, RequireExactlyOne} from 'type-fest';
import {shopifyFetch} from './fetch';
import type {Storefront, ShopifyFetchConfig} from '@/types/index';
import {normalizeProduct} from '@/common/normalize/product';
import {
	ResultProducts,
	ResultProductsByHandles,
	ResultProductsByIds,
	getProducts,
	getProductsByHandles,
	getProductsByIds,
} from '@/common/functions/products';

const normalize = (
	response?: ResultProducts | ResultProductsByHandles | ResultProductsByIds,
): Storefront.Product[] | undefined => {
	if (!response) return undefined;
	return response.map(value => normalizeProduct(value));
};

type FindOptionalArgs = {
	handles: string[];
	ids: string[];
	amount: number;
};
type FindMandatoryArgs = {
	config: ShopifyFetchConfig;
};

type FindProductsArgs = Merge<
	RequireExactlyOne<FindOptionalArgs>,
	FindMandatoryArgs
>;

export const findMany = async ({
	ids,
	handles,
	amount,
	config,
}: FindProductsArgs) => {
	if (handles) {
		const result = await getProductsByHandles(handles, config, shopifyFetch);
		return normalize(result);
	}

	if (ids) {
		const result = await getProductsByIds(ids, config, shopifyFetch);
		return normalize(result);
	}

	if (amount) {
		const result = await getProducts(amount, config, shopifyFetch);
		return normalize(result);
	}

	throw new Error('provide either ids or handles');
};
