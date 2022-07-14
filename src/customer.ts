import {shopifyFetch} from './http';
import {CustomerQuery, CustomerQueryVariables} from './graphql/schema';
import type {Storefront, ShopifyFetchConfig} from './types/index';
import {normalizeCustomer} from './normalize/customer';
import {CUSTOMER_QUERY} from './graphql/queries/customer';

export const getCustomer = async (
	accessToken: string,
	fetchConfig: ShopifyFetchConfig,
): Promise<Storefront.Customer | undefined> => {
	const response = await shopifyFetch<CustomerQuery, CustomerQueryVariables>(
		CUSTOMER_QUERY,
		{
			accessToken,
		},
		fetchConfig,
	);

	if (!response?.customer) return;
	return normalizeCustomer(response.customer);
};

export const find = {};
