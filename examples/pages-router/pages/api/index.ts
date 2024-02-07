import type { NextApiRequest, NextApiResponse } from 'next';
import { createSdk, getSession } from '@descope/nextjs-sdk/server';

const sdk = createSdk({
	projectId: process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID,
	managementKey: process.env.DESCOPE_MANAGEMENT_KEY
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const currentSession = getSession(req);
	if (!currentSession) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	if (!sdk.management) {
		console.error(
			'Management SDK is not available, Make sure you have the DESCOPE_MANAGEMENT_KEY environment variable set'
		);
		return res.status(500).json({ message: 'Internal error' });
	}

	const userRes = await sdk.management.user.loadByUserId(
		currentSession.token.sub
	);
	if (!userRes.ok) {
		console.error('Failed to load user', userRes.error);
		return res.status(404).json({ message: 'Not found' });
	}

	res.status(200).json(userRes.data);
}
