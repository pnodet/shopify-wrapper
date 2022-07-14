const isServer = () => typeof window === 'undefined';
export const shouldRun = () => isServer();
export const errorMessage =
	'This function should not be run on the client. Please use @shopify-wrapper/client';
