import {shopifyFetch} from './http';
import {CustomerQuery, CustomerQueryVariables} from './graphql/schema';
import type {Storefront, ShopifyFetchConfig} from './types';
import {configParser} from './validation';
import {normalizeCustomer} from './normalize';
import {CUSTOMER_QUERY} from './graphql/queries';

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

type FindCustomerArgs = {
	accessToken: string;
	config: ShopifyFetchConfig;
};

export const find = async ({accessToken, config}: FindCustomerArgs) => {
	configParser.parse(config);
	return getCustomer(accessToken, config);
};
