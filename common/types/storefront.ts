import {CurrencyCode} from './currency-code';

export type Image = {
	id?: string;
	url: string;
	altText?: string;
	width?: number;
	height?: number;
	blurDataUrl?: string; // Only when generated in the backend
};

export type Measurement = {
	value: number;
	unit: 'KILOGRAMS' | 'GRAMS' | 'POUNDS' | 'OUNCES';
};

export type Money = {
	amount: string;
	currencyCode: CurrencyCode;
};

export type ProductOption = {
	id: string;
	name: string;
	values: string[];
};

export type SelectedProductOption = {
	name: string;
	value: string;
};

export type ProductVariant = {
	id: string;
	name: string;
	options: SelectedProductOption[];
	availableForSale: boolean;
	product: {
		id: string;
		name: string;
		handle: string;
		type?: string;
		vendor?: string;
	};
	sku?: string;
	price: Money;
	compareAtPrice?: Money;
	quantityAvailable?: number;
	image?: Image;
	customFields: Record<string, string>;
};

export type ProductReviews = {
	note: number;
	total: number;
	comments: ReviewComment[];
};

export type ReviewComment = {
	id: string;
	title?: string;
	body: string;
	score: number;
	authorName: string;
};

export type Product = {
	__typename: 'Product';
	id: string;
	name: string;
	description: string;
	descriptionHtml?: string;
	handle: string;
	type?: string;
	vendor?: string;
	images: Image[];
	variants: ProductVariant[];
	priceRange: {
		min: Money;
		max: Money;
	};
	options: ProductOption[];
	reviews?: ProductReviews;
	url: string;
	customFields: Record<string, string>;
};

export type Collection = {
	__typename: 'Collection';
	id: string;
	name: string;
	description: string;
	descriptionHtml?: string;
	slug: string;
	image?: Image;
	customFields: Record<string, string>;
	products: Product[];
};

export type Page = {
	id: string;
	slug: string;
	title: string;
	body: string;
	customFields: Record<string, string>;
};

export type Metafield = {
	id: string;
	namespace: string;
	key: string;
} & (
	| {
			type:
				| 'single_line_text_field'
				| 'multi_line_text_field'
				| 'date'
				| 'date_time'
				| 'url'
				| 'color'
				| 'json';
			value: string;
	  }
	| {
			type: 'number_integer' | 'number_decimal';
			value: number;
	  }
	| {
			type: 'boolean';
			value: boolean;
	  }
	| {
			type: 'weight' | 'volume' | 'dimension';
			value: {unit: string; value: number};
	  }
	| {
			type: 'rating';
			value: {
				value: number;
				scale_min: number;
				scale_max: number;
			};
	  }
	| {
			type: 'product_reference';
			value: Product;
	  }
	| {
			type: 'variant_reference';
			value: ProductVariant;
	  }
	| {
			type: 'page_reference';
			value: Page;
	  }
	| {
			type: 'file_reference';
			value: Image;
	  }
);

export type Customer = {
	id: string;
	displayName: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	phone?: string;
};
