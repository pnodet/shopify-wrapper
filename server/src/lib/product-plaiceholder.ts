import {getPlaiceholder} from 'plaiceholder';
import {FullProductFragment} from '@/common/graphql/schema';
import type {Storefront} from '@/types/index';
import {normalizeProduct} from '@/common/normalize/product';

export const productWithPlaiceholder = async (
	product: FullProductFragment,
): Promise<Storefront.Product> => {
	const array1 = product.images.edges.map(({node}) => node.originalSrc);
	const array2 = product.variants.edges.map(
		({node: variant}) => variant.image?.originalSrc ?? '',
	);

	const urls = new Set<string>([...array1, ...array2]);

	urls.delete('');

	const imagesPromises = [...urls.values()].map(
		async (url): Promise<[string, string | undefined]> => [
			url,
			(await getPlaiceholder(url)).base64,
		],
	);

	const plaiceholderImages = new Map<string, string | undefined>(
		await Promise.all(imagesPromises),
	);

	return normalizeProduct(product, plaiceholderImages);
};
