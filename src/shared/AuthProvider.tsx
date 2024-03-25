'use client';

import React, { ComponentProps } from 'react';
import {
	AuthProvider as AuthProviderComp,
	baseHeaders
} from '@descope/react-sdk';
import { baseHeaders as nextBaseHeaders } from './constants';

// Override baseHeaders
Object.assign(baseHeaders, nextBaseHeaders);

const AuthProvider = (props: ComponentProps<typeof AuthProviderComp>) => (
	// by default we use sessionTokenViaCookie, so middleware will work out of the box
	<AuthProviderComp sessionTokenViaCookie {...props} />
);

export default AuthProvider;
