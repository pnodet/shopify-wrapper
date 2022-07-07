import type {Storefront} from '../../types';
import {FullCollectionFragment, FullProductFragment} from '../schema';
import {normalizeProduct} from './product';

export const normalizeCollection = (
	collection: FullCollectionFragment,
	products?: FullProductFragment[]
): Storefront.Collection => ({
	__typename: collection.__typename ?? 'Collection',
	id: collection.id,
	name: collection.title,
	description: collection.description,
	descriptionHtml: collection.descriptionHtml,
	slug: collection.handle,
	image: collection.image && {
		id: collection.image.id,
		url: collection.image.originalSrc,
		altText: collection.image.altText,
		width: collection.image.width,
		height: collection.image.height,
	},
	products: products?.map((product) => normalizeProduct(product)) ?? [],
	customFields: {},
});
