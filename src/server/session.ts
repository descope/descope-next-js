import { AuthenticationInfo } from '@descope/node-sdk';
import { NextApiRequest } from 'next';
import { headers } from 'next/headers';
import { DESCOPE_SESSION_HEADER } from './constants';

function extractSession(
	descopeSession?: string
): AuthenticationInfo | undefined {
	if (!descopeSession) {
		return undefined;
	}
	try {
		const authInfo = JSON.parse(
			Buffer.from(descopeSession, 'base64').toString()
		) as AuthenticationInfo;
		return authInfo;
	} catch (err) {
		return undefined;
	}
}
// returns the session token if it exists in the headers
// This function require middleware
export function session(): AuthenticationInfo | undefined {
	return extractSession(headers()?.get(DESCOPE_SESSION_HEADER));
}

// returns the session token if it exists in the request headers
// This function require middleware
export function getSession(
	req: NextApiRequest
): AuthenticationInfo | undefined {
	return extractSession(
		req.headers[DESCOPE_SESSION_HEADER.toLowerCase()] as string
	);
}
