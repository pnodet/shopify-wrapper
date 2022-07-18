import {shopifyFetch} from './http';
import {
	MetafieldByProductHandleQuery,
	MetafieldByProductHandleQueryVariables,
	MetafieldByProductIdQuery,
	MetafieldByProductIdQueryVariables,
} from './graphql/schema';
import {normalizeMetafield} from './normalize';
import {
	METAFIELD_BY_PRODUCT_HANDLE_QUERY,
	METAFIELD_BY_PRODUCT_ID_QUERY,
} from './graphql/queries';
import type {ShopifyFetchConfig, Storefront} from './types';
import {configParser, handleParser, idParser} from './validation';
import {ValidationError} from './errors';

const getMetafieldByProductHandle = async (
	handle: string,
	fetchConfig: ShopifyFetchConfig,
	namespace: string,
	key: string,
): Promise<Storefront.Metafield | undefined> => {
	const response = await shopifyFetch<
		MetafieldByProductHandleQuery,
		MetafieldByProductHandleQueryVariables
	>(
		METAFIELD_BY_PRODUCT_HANDLE_QUERY,
		{
			handle,
			namespace,
			key,
		},
		fetchConfig,
	);

	if (!response?.product?.metafield) {
		return;
	}

	return normalizeMetafield(response.product.metafield);
};

const getMetafieldByProductId = async (
	id: string,
	fetchConfig: ShopifyFetchConfig,
	namespace: string,
	key: string,
): Promise<Storefront.Metafield | undefined> => {
	const response = await shopifyFetch<
		MetafieldByProductIdQuery,
		MetafieldByProductIdQueryVariables
	>(
		METAFIELD_BY_PRODUCT_ID_QUERY,
		{
			id,
			namespace,
			key,
		},
		fetchConfig,
	);

	if (!response?.product?.metafield) {
		return;
	}

	return normalizeMetafield(response.product.metafield);
};

type HandleVariant = {
	productHandle: string;
	config: ShopifyFetchConfig;
	namespace: string;
	key: string;
	productId?: never;
};

type IdVariant = {
	productId: string;
	config: ShopifyFetchConfig;
	namespace: string;
	key: string;
	productHandle?: never;
};

type FindMetafieldArgs = HandleVariant | IdVariant;

export const find = async ({
	productId,
	productHandle,
	config,
	namespace,
	key,
}: FindMetafieldArgs) => {
	configParser.parse(config);

	if (productHandle) {
		handleParser.parse(productHandle);
		return getMetafieldByProductHandle(productHandle, config, namespace, key);
	}

	if (productId) {
		idParser.parse(productId);
		return getMetafieldByProductId(productId, config, namespace, key);
	}

	throw new ValidationError('provide either productId or productHandle');
};
