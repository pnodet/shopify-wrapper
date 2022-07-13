import {CustomerQuery, CustomerQueryVariables} from '../graphql/schema';
import type {ShopifyFetchConfig} from '../../types/index';
import {CUSTOMER_QUERY} from '../queries/customer';
import {shopifyFetch as shopifyFetch_} from './fetch';

export const getCustomer = async (
	accessToken: string,
	fetchConfig: ShopifyFetchConfig,
	shopifyFetch: typeof shopifyFetch_,
): Promise<CustomerQuery['customer'] | undefined> => {
	const response = await shopifyFetch<CustomerQuery, CustomerQueryVariables>(
		CUSTOMER_QUERY,
		{
			accessToken,
		},
		fetchConfig,
	);

	if (!response?.customer) {
		return;
	}

	return response.customer;
};
