/* eslint-disable unicorn/template-indent, @typescript-eslint/naming-convention */
import {gql} from 'graphql-tag';
import {FullMetafield} from '../graphql/fragments';

export const METAFIELD_BY_PRODUCT_HANDLE_QUERY = gql`
	query metafieldByProductHandle(
		$handle: String!
		$namespace: String!
		$key: String!
	) {
		product(handle: $handle) {
			metafield(namespace: $namespace, key: $key) {
				...FullMetafield
			}
		}
	}
	${FullMetafield}
`;

export const METAFIELD_BY_PRODUCT_ID_QUERY = gql`
	query metafieldByProductID($id: ID!, $namespace: String!, $key: String!) {
		product(id: $id) {
			metafield(namespace: $namespace, key: $key) {
				...FullMetafield
			}
		}
	}
	${FullMetafield}
`;

export const METAFIELDS_BY_PRODUCT_ID_QUERY = gql`
	query metafieldsByProductID($id: ID!, $amount: Int!) {
		product(id: $id) {
			metafield(first: $amount) {
				...FullMetafield
			}
		}
	}
	${FullMetafield}
`;

export const METAFIELDS_BY_PRODUCT_HANDLE_QUERY = gql`
	query metafieldsByProductHandle($handle: String!, $amount: Int!) {
		product(handle: $handle) {
			metafield(first: $amount) {
				...FullMetafield
			}
		}
	}
	${FullMetafield}
`;

export const METAFIELD_BY_COLLECTION_ID_QUERY = gql`
	query metafieldByCollectionID($id: ID!, $namespace: String!, $key: String!) {
		collection(id: $id) {
			title
			metafield(namespace: $namespace, key: $key) {
				...FullMetafield
			}
		}
	}
	${FullMetafield}
`;
