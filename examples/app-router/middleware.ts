import { authMiddleware } from '@descope/nextjs-sdk/server';

export default authMiddleware({
	projectId: process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID
});

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
