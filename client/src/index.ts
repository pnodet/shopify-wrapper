import {find as findCollection} from './collection';
import {findMany as findCollections} from './collections';
import {find as findProduct} from './product';
import {findMany as findProducts} from './products';
import {find as findMetafield} from './metafield';
import {find as findCustomer} from './customer';

const shopifyWrapper = {
	collection: {
		find: findCollection,
		findMany: findCollections,
	},
	product: {
		find: findProduct,
		findMany: findProducts,
	},
	metafield: {
		find: findMetafield,
	},
	customer: {
		find: findCustomer,
	},
};

export default shopifyWrapper;
