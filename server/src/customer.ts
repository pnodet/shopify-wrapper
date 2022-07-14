import {shopifyFetch} from './fetch';
import {CustomerQuery} from '@/common/graphql/schema';
import type {Storefront, ShopifyFetchConfig} from '@/types/index';
import {normalizeCustomer} from '@/common/normalize/customer';
import {getCustomer} from '@/common/functions/customer';
import { shouldRun, shouldNotRunMsg } from './lib/should-run';

const normalize = (customer?: CustomerQuery['customer']) => {
	if (!customer) return undefined;
	return normalizeCustomer(customer);
};

export const find = async (
	accessToken: string,
	fetchConfig: ShopifyFetchConfig,
): Promise<Storefront.Customer | undefined> => {
	if (!shouldRun()) throw new Error(shouldNotRunMsg);
	const result = await getCustomer(accessToken, fetchConfig, shopifyFetch);
	return normalize(result);
};
