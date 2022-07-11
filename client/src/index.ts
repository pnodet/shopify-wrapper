import {find} from './collection';
import {findMany} from './collections';
import {product} from './product';
import {customer} from './customer';
import {metafield} from './metafield';

const shopifyWrapper = {
	collection: {
		find,
		findMany,
	},
	product,
	customer,
	metafield,
};

export default shopifyWrapper;
