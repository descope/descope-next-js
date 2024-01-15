import { getSession } from '../server';

const session = async () => {
	// Import next nad headers dynamically to avoid SSR issues in next12
	const { headers } = require('next/headers');
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { NextRequest } = await import('next/server');
	const req = new NextRequest('https://placeholder.com', {
		headers: headers()
	});
	return await getSession(req);
};

export default session;
