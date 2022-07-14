import path from 'node:path';
import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			reporter: ['text', 'json', 'html'],
		},
	},
	resolve: {
		alias: [
			{find: '@/common', replacement: path.resolve(__dirname, '../common/src')},
			{find: '@/types', replacement: path.resolve(__dirname, './common/types')},
		],
	},
});
