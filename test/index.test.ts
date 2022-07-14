import {describe, it, expect} from 'vitest';
import shopifyWrapper from '../src';

describe('product', () => {
	it('find', async () => {
		const result = await shopifyWrapper.product.find({
			handle: 'test',
			config: {
				domain: 'test',
				token: 'test',
			},
		});
		expect(result).toBeDefined();
	});
});
