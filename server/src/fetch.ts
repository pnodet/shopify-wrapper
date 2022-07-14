import fetch from 'node-fetch';
import {DocumentNode} from 'graphql';
import type {ShopifyFetchConfig} from '@/types/index';
import {fetcher} from '@/common/http/fetch';

export const shopifyFetch = async <ReturnValue, Variables>(
	query: DocumentNode,
	variables: Variables,
	{domain, token, isStorefront}: ShopifyFetchConfig,
): Promise<ReturnValue | undefined> =>
	fetcher(query, variables, {domain, token, isStorefront}, fetch);
