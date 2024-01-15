import Link from 'next/link';
import React from 'react';

function index() {
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

export default index;
