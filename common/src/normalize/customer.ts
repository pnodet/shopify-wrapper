import type {Storefront} from '../../types';
import {FullCustomerFragment} from '../graphql/schema';

export const normalizeCustomer = (
	customer: FullCustomerFragment,
): Storefront.Customer => ({
	id: customer.id,
	displayName: customer.displayName,
	firstName: customer.firstName,
	lastName: customer.lastName,
	email: customer.email,
	phone: customer.phone,
});
