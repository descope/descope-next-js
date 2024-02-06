import { NextRequest, NextResponse } from 'next/server';
import descopeSdk from '@descope/node-sdk';
import type { AuthenticationInfo } from '@descope/node-sdk';
import { DESCOPE_SESSION_HEADER } from './constants';
import { getGlobalSdk } from './sdk';

type MiddlewareOptions = {
	// The Descope project ID to use for authentication
	// Defaults to process.env.DESCOPE_PROJECT_ID
	projectId?: string;

	// The Descope management key to use for authentication
	// Defaults to process.env.DESCOPE_MANAGEMENT_KEY
	managementKey?: string;

	// The URL to redirect to if the user is not authenticated
	// Defaults to process.env.SIGN_IN_ROUTE or '/sign-in' if not provided
	redirectUrl?: string;

	// An array of public routes that do not require authentication
	// In addition to the default public routes:
	// - process.env.SIGN_IN_ROUTE or /sign-in if not provided
	// - process.env.SIGN_UP_ROUTE or /sign-up if not provided
	publicRoutes?: string[];
};

function getSessionJwt(req: NextRequest): string | undefined {
	let jwt = req.headers?.get('Authorization')?.split(' ')[1];
	if (jwt) {
		return jwt;
	}

	jwt = req.cookies?.get(descopeSdk.SessionTokenCookieName)?.value;
	if (jwt) {
		return jwt;
	}
	return undefined;
}

const defaultPublicRoutes = {
	signIn: process.env.SIGN_IN_ROUTE || '/sign-in',
	signUp: process.env.SIGN_UP_ROUTE || '/sign-up'
};

const isPublicRoute = (req: NextRequest, options: MiddlewareOptions) => {
	const isDefaultPublicRoute = Object.values(defaultPublicRoutes).includes(
		req.nextUrl.pathname
	);
	const isPublicRoute = options.publicRoutes?.includes(req.nextUrl.pathname);

	return isDefaultPublicRoute || isPublicRoute;
};

const addSessionToHeadersIfExists = (
	headers: Headers,
	session: AuthenticationInfo | undefined
): Headers => {
	if (session) {
		const requestHeaders = new Headers(headers);
		requestHeaders.set(
			DESCOPE_SESSION_HEADER,
			Buffer.from(JSON.stringify(session)).toString('base64')
		);
		return requestHeaders;
	}
	return headers;
};

// returns a Middleware that checks if the user is authenticated
// if the user is not authenticated, it redirects to the redirectUrl
// if the user is authenticated, it adds the session to the headers
const createAuthMiddleware = (options: MiddlewareOptions = {}) => {
	return async (req: NextRequest) => {
		console.debug('Auth middleware starts');

		const jwt = getSessionJwt(req);

		// check if the user is authenticated
		let session: AuthenticationInfo | undefined;
		try {
			session = await getGlobalSdk({
				projectId: options.projectId,
				managementKey: options.managementKey
			}).validateJwt(jwt);
		} catch (err) {
			console.debug('Auth middleware, Failed to validate JWT', err);
			if (!isPublicRoute(req, options)) {
				const defaultRedirectUrl =
					options.redirectUrl || defaultPublicRoutes.signIn;
				const url = req.nextUrl.clone();
				url.pathname = defaultRedirectUrl;
				console.debug(`Auth middleware, Redirecting to ${url}`);
				return NextResponse.redirect(url);
			}
		}

		console.debug('Auth middleware finishes');
		// add the session to the request, if it exists
		const headers = addSessionToHeadersIfExists(req.headers, session);
		return NextResponse.next({
			request: {
				headers
			}
		});
	};
};

export default createAuthMiddleware;
