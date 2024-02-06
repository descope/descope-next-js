import React from 'react';
import { session } from '@descope/nextjs-sdk/server';
import UserDetails from './UserDetails';

async function Page() {
	const sessionRes = session();

	return (
		<div>
			<h1>App Router Home</h1>
			<UserDetails />
			<p>{!sessionRes ? 'User is not logged in' : 'User is logged in'}</p>
		</div>
	);
}

export default Page;
