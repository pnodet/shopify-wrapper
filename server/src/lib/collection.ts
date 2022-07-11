import {productWithPlaiceholder} from './product-plaiceholder';
import type {Storefront} from '@/types/index';
import {FullCollectionFragment, FullProductFragment} from '@/common/schema';

export const normalizeCollection = async (
	collection: FullCollectionFragment,
	products?: FullProductFragment[],
): Promise<Storefront.Collection> => ({
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
	products: await Promise.all(
		products?.map(async product => productWithPlaiceholder(product)) ?? [],
	),
	customFields: {},
});
