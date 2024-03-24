import React from 'react';
import { session } from '@descope/nextjs-sdk/server';
import UserDetails from './UserDetails';
import Link from 'next/link';

async function Page() {
	const sessionRes = session();

	return (
		<div>
			<h1>App Router Home</h1>
			<UserDetails />
			<p>{!sessionRes ? 'User is not logged in' : 'User is logged in'}</p>
			{
				// show link to Manage Users, Roles, and Access Keys if user is logged in
				true && (
					<div>
						<Link href="/manage-users">Manage Users</Link>
						<br />
						<Link href="/manage-roles">Manage Roles</Link>
						<br />
						<Link href="/manage-access-keys">Manage Access Keys</Link>
					</div>
				)
			}
		</div>
	);
}

export default Page;
