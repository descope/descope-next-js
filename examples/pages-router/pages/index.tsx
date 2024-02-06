import Link from 'next/link';
import React from 'react';
import UserDetails from './_components/UserDetails';

function index() {
	return (
		<div>
			<h1>Pages Router Home</h1>
			<UserDetails />
		</div>
	);
}

export default index;
