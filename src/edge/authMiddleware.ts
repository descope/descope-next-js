import { NextRequest, NextResponse } from 'next/server';

// export const runtime = "nodejs";

const authMiddleware = (req: NextRequest) => {
	// do something with the request

	console.log('@@@ Descope authMiddleware');
	return NextResponse.next();
};

export default authMiddleware;
