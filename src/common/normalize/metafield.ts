import type {Storefront} from '../../types';
import {FullImageFragment, FullMetafieldFragment} from '../schema';
import {normalizeProduct} from './product';
import {normalizeImage} from './image';
import {normalizeProductVariant} from './product-variant';
import {normalizePage} from './page';

function checkType(type: string): type is Storefront.Metafield['type'] {
	return [
		'single_line_text_field',
		'multi_line_text_field',
		'date',
		'date_time',
		'url',
		'color',
		'json',
		'number_integer',
		'number_decimal',
		'boolean',
		'weight',
		'volume',
		'dimension',
		'rating',
		'product_reference',
		'variant_reference',
		'page_reference',
		'file_reference',
	].includes(type);
}

export const normalizeMetafield = (
	metafield: FullMetafieldFragment
): Storefront.Metafield | undefined => {
	const {type} = metafield;
	if (!checkType(type)) return;

	switch (type) {
		case 'single_line_text_field':
		case 'multi_line_text_field':
		case 'date':
		case 'date_time':
		case 'url':
		case 'color':
		case 'json': {
			return {
				id: metafield.id,
				namespace: metafield.namespace,
				key: metafield.key,
				type,
				value: metafield.value,
			};
		}

		case 'number_integer':
		case 'number_decimal': {
			return {
				id: metafield.id,
				namespace: metafield.namespace,
				key: metafield.key,
				type,
				value: Number.parseFloat(metafield.value),
			};
		}

		case 'boolean': {
			return {
				id: metafield.id,
				namespace: metafield.namespace,
				key: metafield.key,
				type,
				value: metafield.value === 'true',
			};
		}

		case 'weight':
		case 'volume':
		case 'dimension': {
			return {
				id: metafield.id,
				namespace: metafield.namespace,
				key: metafield.key,
				type,
				value: JSON.parse(metafield.value),
			};
		}

		case 'rating': {
			return {
				id: metafield.id,
				namespace: metafield.namespace,
				key: metafield.key,
				type,
				value: JSON.parse(metafield.value),
			};
		}

		case 'product_reference': {
			if (metafield.reference?.__typename === 'Product')
				return {
					id: metafield.id,
					namespace: metafield.namespace,
					key: metafield.key,
					type,
					value: normalizeProduct(metafield.reference),
				};
			return;
		}

		case 'variant_reference': {
			if (metafield.reference?.__typename === 'ProductVariant')
				return {
					id: metafield.id,
					namespace: metafield.namespace,
					key: metafield.key,
					type,
					value: normalizeProductVariant(metafield.reference),
				};
			return;
		}

		case 'page_reference': {
			if (metafield.reference?.__typename === 'Page')
				return {
					id: metafield.id,
					namespace: metafield.namespace,
					key: metafield.key,
					type,
					value: normalizePage(metafield.reference),
				};

			return;
		}

		case 'file_reference': {
			if (metafield.reference?.__typename === 'MediaImage')
				return {
					id: metafield.id,
					namespace: metafield.namespace,
					key: metafield.key,
					type,
					value: normalizeImage(metafield.reference.image as FullImageFragment),
				};
		}

		default:
	}
};
