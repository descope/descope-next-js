import React from 'react';
import { session } from '@descope/nextjs-sdk/server';
import Link from 'next/link';
import UserDetails from './UserDetails';

async function Page() {
	const sessionRes = session();

	return (
		<div>
			<h1>App Router Home</h1>
			<UserDetails />
			{!sessionRes && (
				<p>
					User is not logged in
				</p>
			)}
		</div>
	);
}

export default Page;
