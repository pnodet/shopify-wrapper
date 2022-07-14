const isClient = () => typeof window !== 'undefined';
export const shouldRun = () => !isClient();
export const shouldNotRunMsg = 'This function should not be run on the client. Please use @shopify-wrapper/client';
