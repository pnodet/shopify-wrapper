import gql from 'graphql-tag';
import {FullProduct} from '../fragments.js';

export const PRODUCT_BY_HANDLE_QUERY = gql`
	query productByHandle($handle: String!) {
		product(handle: $handle) {
			...FullProduct
		}
	}
	${FullProduct}
`;

export const PRODUCT_BY_ID_QUERY = gql`
	query productByID($id: ID!) {
		product(id: $id) {
			...FullProduct
		}
	}
	${FullProduct}
`;
