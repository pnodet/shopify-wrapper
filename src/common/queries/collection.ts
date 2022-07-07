import gql from 'graphql-tag';

import {FullCollection, FullProduct} from '../fragments';

export const COLLECTION_BY_ID_QUERY = gql`
	query collectionByID($id: ID!, $maxProductsPerCollection: Int!) {
		collection(id: $id) {
			...FullCollection
			products(first: $maxProductsPerCollection) {
				edges {
					node {
						...FullProduct
					}
				}
			}
		}
	}
	${FullCollection}
	${FullProduct}
`;

export const COLLECTION_BY_HANDLE_QUERY = gql`
	query collectionByHandle($handle: String!, $maxProductsPerCollection: Int!) {
		collection(handle: $handle) {
			...FullCollection
			products(first: $maxProductsPerCollection) {
				edges {
					node {
						...FullProduct
					}
				}
			}
		}
	}
	${FullCollection}
	${FullProduct}
`;
