/* eslint-disable unicorn/template-indent, @typescript-eslint/naming-convention */
import {gql} from 'graphql-tag';

export const FullImage = gql`
	fragment FullImage on Image {
		id
		width
		height
		altText
		originalSrc
	}
`;

export const FullCollection = gql`
	fragment FullCollection on Collection {
		id
		handle
		title
		description
		descriptionHtml

		image {
			...FullImage
		}
	}
	${FullImage}
`;

export const FullVariant = gql`
	fragment FullVariant on ProductVariant {
		id
		title
		sku
		availableForSale
		requiresShipping
		quantityAvailable
		currentlyNotInStock

		selectedOptions {
			name
			value
		}

		priceV2 {
			amount
			currencyCode
		}

		compareAtPriceV2 {
			amount
			currencyCode
		}

		image {
			...FullImage
		}
	}
	${FullImage}
`;

export const BasicProduct = gql`
	fragment BasicProduct on Product {
		id
		title
		handle
		productType
		vendor
	}
`;

export const FullVariantWithProduct = gql`
	fragment FullVariantWithProduct on ProductVariant {
		...FullVariant

		product {
			...BasicProduct
		}
	}
	${FullVariant}
	${BasicProduct}
`;

export const FullProduct = gql`
	fragment FullProduct on Product {
		id
		handle
		availableForSale
		title
		productType
		vendor
		description
		descriptionHtml
		totalInventory

		options {
			id
			name
			values
		}

		priceRange {
			maxVariantPrice {
				amount
				currencyCode
			}
			minVariantPrice {
				amount
				currencyCode
			}
		}

		variants(first: 250) {
			pageInfo {
				hasNextPage
				hasPreviousPage
			}
			edges {
				cursor
				node {
					...FullVariant
				}
			}
		}

		images(first: 250) {
			pageInfo {
				hasNextPage
				hasPreviousPage
			}
			edges {
				cursor
				node {
					...FullImage
				}
			}
		}
	}
	${FullVariant}
	${FullImage}
`;

export const BasicPage = gql`
	fragment BasicPage on Page {
		id
		title
		handle
	}
`;

export const FullPage = gql`
	fragment FullPage on Page {
		...BasicPage
		body
		bodySummary
	}

	${BasicPage}
`;

export const FullCheckout = gql`
	fragment FullCheckout on Checkout {
		id
		webUrl
		completedAt
		createdAt
		taxesIncluded

		subtotalPriceV2 {
			amount
			currencyCode
		}

		totalTaxV2 {
			amount
			currencyCode
		}

		totalPriceV2 {
			amount
			currencyCode
		}

		lineItems(first: 250) {
			pageInfo {
				hasNextPage
				hasPreviousPage
			}
			edges {
				cursor
				node {
					id
					title
					quantity

					variant {
						...FullVariant
						product {
							handle
						}
					}
				}
			}
		}
	}
	${FullVariant}
`;

export const FullMetafield = gql`
	fragment FullMetafield on Metafield {
		id
		description
		key
		namespace
		reference {
			__typename
			... on MediaImage {
				alt
				id
				image {
					...FullImage
				}
			}
			... on ProductVariant {
				...FullVariantWithProduct
			}
			... on Page {
				...FullPage
			}
			... on Product {
				...FullProduct
			}
		}
		type
		value
	}
	${FullImage}
	${FullPage}
	${FullProduct}
	${FullVariantWithProduct}
`;

export const FullCart = gql`
	fragment FullCart on Cart {
		id
		checkoutUrl
		createdAt
		note
		updatedAt

		attributes {
			key
			value
		}

		buyerIdentity {
			countryCode
			customer {
				id
				email
				firstName
				lastName
			}
			email
			phone
		}

		discountCodes {
			applicable
			code
		}

		estimatedCost {
			subtotalAmount {
				amount
				currencyCode
			}
			totalAmount {
				amount
				currencyCode
			}
			totalDutyAmount {
				amount
				currencyCode
			}
			totalTaxAmount {
				amount
				currencyCode
			}
		}

		lines(first: 250) {
			edges {
				node {
					id
					quantity

					attributes {
						key
						value
					}

					discountAllocations {
						discountedAmount {
							amount
							currencyCode
						}
					}

					estimatedCost {
						subtotalAmount {
							amount
							currencyCode
						}
						totalAmount {
							amount
							currencyCode
						}
					}

					merchandise {
						... on ProductVariant {
							...FullVariant
							product {
								id
								handle
								title
								productType
								vendor
							}
						}
					}
					# sellingPlanAllocation
				}
			}
		}
	}
	${FullVariant}
`;

export const FullCustomer = gql`
	fragment FullCustomer on Customer {
		id
		displayName
		firstName
		lastName
		email
		phone
	}
`;

export const FullAuthor = gql`
	fragment FullAuthor on ArticleAuthor {
		name
		firstName
		lastName
		email
		bio
	}
`;

export const FullArticle = gql`
	fragment FullArticle on Article {
		id
		title
		handle
		content
		contentHtml
		excerpt
		excerptHtml
		authorV2 {
			...FullAuthor
		}
		image {
			...FullImage
		}
		publishedAt
		seo {
			title
			description
		}
		tags
	}
	${FullAuthor}
	${FullImage}
`;

export const FullBlog = gql`
	fragment FullBlog on Blog {
		id
		handle
		title
		authors {
			...FullAuthor
		}
		seo {
			title
			description
		}
		articles(first: 250) {
			edges {
				node {
					...FullArticle
				}
			}
		}
	}
	${FullArticle}
`;
