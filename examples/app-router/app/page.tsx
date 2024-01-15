import React from 'react';
// import { session } from '@descope/nextjs-sdk';
// import { NextRequest } from 'next/server';
import Link from 'next/link';

async function Page() {
	// const sessionRes = await session();

	// console.log(sessionRes);

	const sessionRes = false;

	return (
		<div>
			<h1>App Router Home</h1>
			{/* {sessionRes && <p>User is logged in</p>} */}
			{!sessionRes && (
				<p>
					User is not logged in. <Link href="/login">Login</Link>
				</p>
			)}
		</div>
	);
}

export default Page;
