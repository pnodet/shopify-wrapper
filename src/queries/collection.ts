/* eslint-disable unicorn/template-indent, @typescript-eslint/naming-convention */
import {gql} from 'graphql-tag';
import {FullCollection, FullProduct} from '../graphql/fragments';

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

export const COLLECTIONS_QUERY = gql`
	query collections($first: Int!, $maxProductsPerCollection: Int!) {
		collections(first: $first) {
			pageInfo {
				hasNextPage
				hasPreviousPage
			}
			edges {
				cursor
				node {
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
		}
	}
	${FullCollection}
	${FullProduct}
`;
