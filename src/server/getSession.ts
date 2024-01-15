import DescopeClient from '@descope/node-sdk';
import { NextRequest } from 'next/server';

const sdk = DescopeClient({
	projectId: process.env.DESCOPE_PROJECT_ID || 'dummy',
	fetch: fetch // passing fetch from the environment (server/edge) to the SDK
});

const getSession = async (req: NextRequest) => {
	let jwt = req.headers?.get('Authorization')?.split(' ')[1];
	if (!jwt) {
		jwt = req.cookies?.[DescopeClient.SessionTokenCookieName];
	}
	if (!jwt) {
		return null;
	}

	try {
		return await sdk.validateJwt(jwt);
	} catch (err) {
		console.error(err);
		return null;
	}
};

export default getSession;
