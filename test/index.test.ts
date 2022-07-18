import {describe, it, expect} from 'vitest';
import shopifyWrapper from '../src';
import 'dotenv/config.js';

const config = {
	domain: process.env.DOMAIN!,
	token: process.env.TOKEN!,
};

describe('product', () => {
	it('find', async () => {
		const result = await shopifyWrapper.product.findMany({
			amount: 10,
			config,
		});
		expect(result).toBeDefined();
	});
});
