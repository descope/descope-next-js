import { Descope } from '@descope/nextjs-sdk';

export default function Login() {
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			height: '100vh',
		}}>
			<h1>App Router Login</h1>
			{/* Note that if the component is rendered on the server
			you cannot pass onSuccess/onError callbacks because they are not serializable. */}
			<Descope flowId="sign-up-or-in" redirectAfterSuccess="/" />
		</div>
	);
}
