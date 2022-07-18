import {shopifyFetch} from './http';
import {
	Product,
	ProductByHandleQuery,
	ProductByHandleQueryVariables,
	ProductByIdQuery,
	ProductByIdQueryVariables,
	ProductsQuery,
	ProductsQueryVariables,
} from './graphql/schema';
import {Storefront, configParser, ShopifyFetchConfig} from './types/index';
import {
	PRODUCTS_QUERY,
	PRODUCT_BY_HANDLE_QUERY,
	PRODUCT_BY_ID_QUERY,
} from './graphql/queries/product';
import {normalizeProduct} from './normalize/product';
import {ValidationError} from './errors/validation';

const cleanProducts = (
	responses: Array<ProductByIdQuery | ProductByHandleQuery | undefined>,
) => {
	const dirtyProducts = responses
		.map(response => response?.product)
		/* eslint-disable-next-line unicorn/prefer-native-coercion-functions */
		.filter((product): product is Product => Boolean(product));

	const collections = dirtyProducts.map(product => normalizeProduct(product));
	return collections;
};

const getProductsByIds = async (
	ids: string[],
	fetchConfig: ShopifyFetchConfig,
): Promise<Storefront.Product[] | undefined> =>
	cleanProducts(
		await Promise.all(
			ids.map(async id =>
				shopifyFetch<ProductByIdQuery, ProductByIdQueryVariables>(
					PRODUCT_BY_ID_QUERY,
					{id},
					fetchConfig,
				),
			),
		),
	);

const getProductsByHandles = async (
	handles: string[],
	fetchConfig: ShopifyFetchConfig,
): Promise<Storefront.Product[] | undefined> =>
	cleanProducts(
		await Promise.all(
			handles.map(async handle =>
				shopifyFetch<ProductByHandleQuery, ProductByHandleQueryVariables>(
					PRODUCT_BY_HANDLE_QUERY,
					{
						handle,
					},
					fetchConfig,
				),
			),
		),
	);

const getProducts = async (
	amount: number,
	fetchConfig: ShopifyFetchConfig,
): Promise<Storefront.Product[] | undefined> => {
	const response = await shopifyFetch<ProductsQuery, ProductsQueryVariables>(
		PRODUCTS_QUERY,
		{
			first: amount,
		},
		fetchConfig,
	);

	if (!response) return [];

	return response.products.edges.map(({node: product}) =>
		normalizeProduct(product),
	);
};

type IdVariant = {
	ids: string[];
	config: ShopifyFetchConfig;
	handles?: never;
	amount?: never;
};

type HandleVariant = {
	handles: string[];
	config: ShopifyFetchConfig;
	ids?: never;
	amount?: never;
};

type AmountVariant = {
	amount: number;
	config: ShopifyFetchConfig;
	handles?: never;
	ids?: never;
};

type FindManyProductsArgs = IdVariant | HandleVariant | AmountVariant;

export const findMany = async ({
	ids,
	handles,
	amount,
	config,
}: FindManyProductsArgs) => {
	configParser.parse(config);

	if (handles) return getProductsByHandles(handles, config);
	if (ids) return getProductsByIds(ids, config);
	if (amount) return getProducts(amount, config);
	throw new ValidationError('provide either ids or handles');
};
