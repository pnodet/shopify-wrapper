const isClient = () => typeof window !== 'undefined';
export const shouldRun = () => isClient();
export const errorMessage =
	'This function should not be run on the server. Please use @shopify-wrapper/server';
