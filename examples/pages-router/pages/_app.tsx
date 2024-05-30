import { AuthProvider } from '@descope/nextjs-sdk';

export default function App({ Component, pageProps }) {
	return (
		<AuthProvider
			projectId={process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID}
			baseUrl={process.env.NEXT_PUBLIC_DESCOPE_BASE_URL}
			baseStaticUrl={process.env.NEXT_PUBLIC_DESCOPE_BASE_STATIC_URL}
		>
			<Component {...pageProps} />
		</AuthProvider>
	);
}
