import type {Storefront} from '../../types';
import {FullImageFragment} from '../graphql/schema';

export const normalizeImage = (
	img: FullImageFragment,
	plaiceholderImages?: Map<string, string | undefined>,
): Storefront.Image => ({
	id: img.id,
	url: img.originalSrc,
	altText: img.altText,
	width: img.width,
	height: img.height,
	blurDataUrl: plaiceholderImages?.get(img.originalSrc),
});
