import { AuthenticationInfo } from '@descope/node-sdk';
import { headers } from 'next/headers';
import { DESCOPE_SESSION_HEADER } from './constants';

// returns the session token if it exists in the headers
// This function require middleware
export default function session(
	requestHeaders?: Headers
): AuthenticationInfo | undefined {
	const readyHeaders = requestHeaders || headers();
	const descopeSession = readyHeaders?.get(DESCOPE_SESSION_HEADER);
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
