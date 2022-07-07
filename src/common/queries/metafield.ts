import gql from 'graphql-tag';
import {FullMetafield} from '../fragments';

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
