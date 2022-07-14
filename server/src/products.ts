import type {Merge, RequireExactlyOne} from 'type-fest';
import {shopifyFetch} from './fetch';
import {productWithPlaiceholder} from './lib/product-plaiceholder';
import type {Storefront, ShopifyFetchConfig} from '@/types/index';
import {
	ResultProducts,
	ResultProductsByHandles,
	ResultProductsByIds,
	getProducts,
	getProductsByHandles,
	getProductsByIds,
} from '@/common/functions/products';
import { shouldRun, shouldNotRunMsg } from './lib/should-run';

const normalize = async (
	response?: ResultProducts | ResultProductsByHandles | ResultProductsByIds,
): Promise<Storefront.Product[] | undefined> => {
	if (!response) return undefined;
	const promises = response.map(async value => {
		if (!value) return undefined;
		return productWithPlaiceholder(value);
	});

	const values = await Promise.all(promises);
	return values.filter((product): product is NonNullable<Storefront.Product> =>
		Boolean(product),
	);
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
		if (!shouldRun()) throw new Error(shouldNotRunMsg);
		const result = await getProductsByHandles(handles, config, shopifyFetch);
		return normalize(result);
	}

	if (ids) {
		if (!shouldRun()) throw new Error(shouldNotRunMsg);
		const result = await getProductsByIds(ids, config, shopifyFetch);
		return normalize(result);
	}

	if (amount) {
		if (!shouldRun()) throw new Error(shouldNotRunMsg);
		const result = await getProducts(amount, config, shopifyFetch);
		return normalize(result);
	}

	throw new Error('provide either ids or handles');
};
