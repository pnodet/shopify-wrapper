/* eslint-disable unicorn/template-indent, @typescript-eslint/naming-convention */
import {gql} from 'graphql-tag';
import {FullProduct} from '../graphql/fragments.js';

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

export const PRODUCTS_QUERY = gql`
	query products($first: Int!) {
		products(first: $first) {
			pageInfo {
				hasPreviousPage
				hasNextPage
			}
			edges {
				cursor
				node {
					...FullProduct
				}
			}
		}
	}
	${FullProduct}
`;
