import { AuthProvider } from '@descope/nextjs-sdk';

export default function App({ Component, pageProps }) {
	return (
		<AuthProvider projectId="P2UEmfEerYrRzTavvNJI9bMTWePg">
			<Component {...pageProps} />
		</AuthProvider>
	);
}
