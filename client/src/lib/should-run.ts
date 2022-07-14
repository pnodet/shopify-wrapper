const isServer = () => typeof window === 'undefined';
export const shouldRun = () => !isServer();
export const shouldNotRunMsg = 'This function should not be run on the server. Please use @shopify-wrapper/server';
