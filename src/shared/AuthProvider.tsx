'use client';
import React, { ComponentProps } from 'react';

import { AuthProvider } from '@descope/react-sdk';

export default function (props: ComponentProps<typeof AuthProvider>) {
	return <AuthProvider {...props} />;
}
