import {getPlaiceholder} from 'plaiceholder';
import type {Storefront} from '@/types/index';
import {FullProductFragment} from '@/common/schema';
import {normalizeProduct} from '@/common/normalize/product';

export const productWithPlaiceholder = async (
	product: FullProductFragment
): Promise<Storefront.Product> => {
	const urls = new Set<string>(
		product.images.edges
			.map(({node}) => node.originalSrc)
			.concat(
				product.variants.edges.map(
					({node: variant}) => variant.image?.originalSrc || ''
				)
			)
	);
	urls.delete('');

	const imagesPromises = [...urls.values()].map(
		async (url): Promise<[string, string | undefined]> => [
			url,
			(await getPlaiceholder(url)).base64,
		]
	);

	const plaiceholderImages = new Map<string, string | undefined>(
		await Promise.all(imagesPromises)
	);

	return normalizeProduct(product, plaiceholderImages);
};
