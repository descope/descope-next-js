import { AuthProvider } from '@descope/nextjs-sdk';

export default function App({ Component, pageProps }) {
	return (
		<AuthProvider projectId={process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID}>
			<Component {...pageProps} />
		</AuthProvider>
	);
}
