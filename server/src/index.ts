import {find as findCollection} from './collection';
import {findMany as findCollections} from './collections';
import {find as findProduct} from './product';
import {findMany as findProducts} from './products';
import {customer} from './customer';
import {metafield} from './metafield';

const shopifyWrapper = {
	collection: {
		find: findCollection,
		findMany: findCollections,
	},
	product: {
		find: findProduct,
		findMany: findProducts,
	},
	customer,
	metafield,
};

export default shopifyWrapper;
