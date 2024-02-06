'use client';
import React, { ComponentProps } from 'react';

import { AuthProvider } from '@descope/react-sdk';

export default function (props: ComponentProps<typeof AuthProvider>) {
	// by default we use sessionTokenViaCookie, so middleware will work out of the box
	return <AuthProvider sessionTokenViaCookie {...props} />;
}
