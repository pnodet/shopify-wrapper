import {CustomerQuery, CustomerQueryVariables} from '@/common/schema';
import type {Storefront, ShopifyFetchConfig} from '@/types/index';
import {normalizeCustomer} from '@/common/normalize/customer';
import {CUSTOMER_QUERY} from '@/common/queries/customer';
import {shopifyFetch} from './fetch';

export const getCustomer = async (
	accessToken: string,
	fetchConfig: ShopifyFetchConfig
): Promise<Storefront.Customer | undefined> => {
	const res = await shopifyFetch<CustomerQuery, CustomerQueryVariables>(
		CUSTOMER_QUERY,
		{
			accessToken,
		},
		fetchConfig
	);

	if (!res?.customer) return;
	return normalizeCustomer(res.customer);
};
