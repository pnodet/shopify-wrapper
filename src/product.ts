import {shopifyFetch} from './http';
import {PRODUCT_BY_HANDLE_QUERY, PRODUCT_BY_ID_QUERY} from './graphql/queries';
import {
	ProductByHandleQuery,
	ProductByHandleQueryVariables,
	ProductByIdQuery,
	ProductByIdQueryVariables,
} from './graphql/schema';
import type {Storefront, ShopifyFetchConfig} from './types';
import {configParser, handleParser, idParser} from './validation';
import {normalizeProduct} from './normalize';
import {ValidationError} from './errors';

const getProductByHandle = async (
	handle: string,
	fetchConfig: ShopifyFetchConfig,
): Promise<Storefront.Product | undefined> => {
	const response = await shopifyFetch<
		ProductByHandleQuery,
		ProductByHandleQueryVariables
	>(
		PRODUCT_BY_HANDLE_QUERY,
		{
			handle,
		},
		fetchConfig,
	);

	if (!response?.product) return;
	return normalizeProduct(response.product);
};

const getProductById = async (
	id: string,
	fetchConfig: ShopifyFetchConfig,
): Promise<Storefront.Product | undefined> => {
	const response = await shopifyFetch<
		ProductByIdQuery,
		ProductByIdQueryVariables
	>(
		PRODUCT_BY_ID_QUERY,
		{
			id,
		},
		fetchConfig,
	);

	if (!response?.product) return;
	return normalizeProduct(response.product);
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

type FindProductArgs = IdVariant | HandleVariant;

export const find = async ({id, handle, config}: FindProductArgs) => {
	configParser.parse(config);

	if (handle) {
		handleParser.parse(handle);
		return getProductByHandle(handle, config);
	}

	if (id) {
		idParser.parse(id);
		return getProductById(id, config);
	}

	throw new ValidationError('provide either id or handle');
};
