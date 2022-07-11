import {shopifyFetch} from './fetch';
import {CustomerQuery, CustomerQueryVariables} from '@/common/schema';
import type {Storefront, ShopifyFetchConfig} from '@/types/index';
import {normalizeCustomer} from '@/common/normalize/customer';
import {CUSTOMER_QUERY} from '@/common/queries/customer';

const getCustomer = async (
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

	if (!response?.customer) {
		return;
	}

	return normalizeCustomer(response.customer);
};

export const customer = {
	find: getCustomer,
};
