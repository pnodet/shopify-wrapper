import type {Storefront} from '../types';
import {
	FullImageFragment,
	FullVariantWithProductFragment,
} from '../graphql/schema';
import {normalizeImage} from './image';
import {normalizeBasicProduct} from './product';

export const normalizeProductVariant = (
	variant: FullVariantWithProductFragment,
): Storefront.ProductVariant => ({
	id: variant.id,
	name: variant.title,
	options: variant.selectedOptions,
	availableForSale: variant.availableForSale,
	product: normalizeBasicProduct(variant.product),
	sku: variant.sku,
	price: variant.priceV2,
	compareAtPrice: variant.compareAtPriceV2,
	quantityAvailable: variant.quantityAvailable,
	image: normalizeImage(variant.image as FullImageFragment),
	customFields: {},
});
