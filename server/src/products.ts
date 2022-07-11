import type {Merge, RequireExactlyOne} from 'type-fest';
import {shopifyFetch} from './fetch';
import {
	ProductByHandleQuery,
	ProductByHandleQueryVariables,
	ProductByIdQuery,
	ProductByIdQueryVariables,
	ProductsQuery,
	ProductsQueryVariables,
} from '@/common/schema';
import type {Storefront, ShopifyFetchConfig} from '@/types/index';
import {
	PRODUCTS_QUERY,
	PRODUCT_BY_HANDLE_QUERY,
	PRODUCT_BY_ID_QUERY,
} from '@/common/queries/product';
import {normalizeProduct} from '@/common/normalize/product';

const cleanProducts = (
	responses: Array<ProductByIdQuery | ProductByHandleQuery | undefined>,
) => {
	const dirtyProducts = responses
		.map(response => response?.product)
		.filter((product): product is NonNullable<ProductByIdQuery['product']> =>
			Boolean(product),
		);

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
	if (handles) return getProductsByHandles(handles, config);
	if (ids) return getProductsByIds(ids, config);
	if (amount) return getProducts(amount, config);
	throw new Error('provide either ids or handles');
};
