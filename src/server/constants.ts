export const DESCOPE_SESSION_HEADER = 'x-descope-session';

export const DEFAULT_PUBLIC_ROUTES = {
	signIn: process.env.SIGN_IN_ROUTE || '/sign-in',
	signUp: process.env.SIGN_UP_ROUTE || '/sign-up'
};
