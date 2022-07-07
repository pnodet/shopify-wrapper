/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import type {Storefront} from '../../types';
import {BasicProductFragment, FullProductFragment} from '../schema';

export const normalizeProduct = (
	product: FullProductFragment,
	plaiceholderImages?: Map<string, string | undefined>
): Storefront.Product => ({
	__typename: product.__typename ?? 'Product',
	id: product.id,
	name: product.title,
	description: product.description,
	descriptionHtml: product.descriptionHtml,
	handle: product.handle,
	type: product.productType,
	vendor: product.vendor,
	images: product.images.edges.map(({node: img}) => ({
		id: img.id,
		url: img.originalSrc,
		altText: img.altText,
		width: img.width,
		height: img.height,
		blurDataUrl: plaiceholderImages?.get(img.originalSrc),
	})),
	variants: product.variants.edges.map(({node: variant}) => ({
		id: variant.id,
		name: variant.title,
		options: variant.selectedOptions,
		availableForSale: Boolean(variant.availableForSale),
		product: {
			id: product.id,
			name: product.title,
			handle: product.handle,
			type: product.productType,
			vendor: product.vendor,
		},
		sku: variant.sku,
		price: variant.priceV2,
		compareAtPrice: variant.compareAtPriceV2,
		quantityAvailable: variant.quantityAvailable,
		image: variant.image
			? {
					id: variant.image.id,
					url: variant.image.originalSrc,
					altText: variant.image.altText,
					width: variant.image.width,
					height: variant.image.height,
					blurDataUrl: plaiceholderImages?.get(variant.image.originalSrc),
			  }
			: undefined,
		customFields: {},
	})),
	priceRange: {
		min: {
			amount: product.priceRange.minVariantPrice.amount,
			currencyCode: product.priceRange.minVariantPrice.currencyCode,
		},
		max: {
			amount: product.priceRange.maxVariantPrice.amount,
			currencyCode: product.priceRange.maxVariantPrice.currencyCode,
		},
	},
	options: product.options,
	reviews: undefined,
	url: '/',
	customFields: {},
});

type ReturnNormalizeBasicProduct = {
	id: string;
	name: string;
	handle: string;
	type: string | undefined;
	vendor: string | undefined;
};

export const normalizeBasicProduct = (
	product: BasicProductFragment
): ReturnNormalizeBasicProduct => ({
	id: product.id,
	name: product.title,
	handle: product.handle,
	type: product.productType,
	vendor: product.vendor,
});
