import { Descope } from '@descope/nextjs-sdk';
import { useSession } from '@descope/nextjs-sdk/client';
import React, { useState } from 'react';

export default function Login() {
	// const [sessionToken, setSessionToken] = useState(null);
	useSession();
	return (
		<div>
			<h1>Pages Router Login</h1>
			{/* Note that if the component that renders Descope is a server component,
			 you cannot pass onSuccess/onError callbacks because they are not serializable. */}
			<Descope flowId="sign-up-or-in" redirectAfterSuccess="/" />
		</div>
	);
}
