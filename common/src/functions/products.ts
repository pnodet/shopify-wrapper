import {
	ProductByHandleQuery,
	ProductByHandleQueryVariables,
	ProductByIdQuery,
	ProductByIdQueryVariables,
	ProductsQuery,
	ProductsQueryVariables,
} from '../graphql/schema';
import type {ShopifyFetchConfig} from '../../types/index';
import {
	PRODUCTS_QUERY,
	PRODUCT_BY_HANDLE_QUERY,
	PRODUCT_BY_ID_QUERY,
} from '../queries/product';
import {shopifyFetch as shopifyFetch_} from './fetch';

export type ResultProductsByIds = Array<ProductByIdQuery['product']>;
export const getProductsByIds = async (
	ids: string[],
	fetchConfig: ShopifyFetchConfig,
	shopifyFetch: typeof shopifyFetch_,
): Promise<ResultProductsByIds | undefined> => {
	const responses = await Promise.all(
		ids.map(async id =>
			shopifyFetch<ProductByIdQuery, ProductByIdQueryVariables>(
				PRODUCT_BY_ID_QUERY,
				{id},
				fetchConfig,
			),
		),
	);

	const dirtyProducts = responses
		.map(response => response?.product)
		.filter((product): product is NonNullable<ProductByIdQuery['product']> =>
			Boolean(product),
		);

	return dirtyProducts;
};

export type ResultProductsByHandles = Array<ProductByHandleQuery['product']>;
export const getProductsByHandles = async (
	handles: string[],
	fetchConfig: ShopifyFetchConfig,
	shopifyFetch: typeof shopifyFetch_,
): Promise<ResultProductsByHandles | undefined> => {
	const responses = await Promise.all(
		handles.map(async handle =>
			shopifyFetch<ProductByHandleQuery, ProductByHandleQueryVariables>(
				PRODUCT_BY_HANDLE_QUERY,
				{
					handle,
				},
				fetchConfig,
			),
		),
	);

	const dirtyProducts = responses
		.map(response => response?.product)
		.filter(
			(product): product is NonNullable<ProductByHandleQuery['product']> =>
				Boolean(product),
		);

	return dirtyProducts;
};

export type ResultProducts = Array<
	ProductsQuery['products']['edges'][0]['node']
>;
export const getProducts = async (
	amount: number,
	fetchConfig: ShopifyFetchConfig,
	shopifyFetch: typeof shopifyFetch_,
): Promise<ResultProducts | undefined> => {
	const response = await shopifyFetch<ProductsQuery, ProductsQueryVariables>(
		PRODUCTS_QUERY,
		{
			first: amount,
		},
		fetchConfig,
	);

	if (!response) return [];
	return response.products.edges.map(({node: product}) => product);
};
