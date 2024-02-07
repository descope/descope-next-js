'use client';

import React, { ComponentProps } from 'react';

import { AuthProvider as AuthProviderComp } from '@descope/react-sdk';

const AuthProvider = (props: ComponentProps<typeof AuthProviderComp>) => (
	// by default we use sessionTokenViaCookie, so middleware will work out of the box
	<AuthProviderComp sessionTokenViaCookie {...props} />
);

export default AuthProvider;
