import type {Storefront} from '../../types';
import {FullPageFragment} from '../graphql/schema';

export const normalizePage = (page: FullPageFragment): Storefront.Page => ({
	id: page.id,
	slug: page.handle,
	title: page.title,
	body: page.body,
	customFields: {},
});
