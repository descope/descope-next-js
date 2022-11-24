// '@descope/web-js-sdk' is a dependency of '@descope/web-component'
// and we want to use the same version that is used there
// eslint-disable-next-line import/no-extraneous-dependencies
import createCoreSdk from '@descope/core-js-sdk';
import React, { FC, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import AuthContext from '../hooks/authContext';
import { IAuthContext, Sdk } from '../types';


const createSdk = dynamic(
	() =>
		import('@descope/web-js-sdk').then((module) => ({
			default: module.default
		})) as any,
	{
		ssr: false
	}
);

declare const BUILD_VERSION: string;

const isBrowser = typeof window !== 'undefined';

interface IAuthProviderProps {
	projectId: string;
	baseUrl?: string;
	children?: JSX.Element;
}

const AuthProvider: FC<IAuthProviderProps> = ({
	projectId,
	baseUrl,
	children
}) => {
	const [user, setUser] = useState({});
	const [sessionToken, setSessionToken] = useState('');

	const sdk = useMemo(() => {
		if (!projectId) {
			return undefined;
		}

		const createFn = isBrowser ? createCoreSdk : (createSdk as any);
		return createFn({
			projectId,
			baseUrl,
			hooks: {
				beforeRequest: (config) => {
					const conf = config;
					conf.headers = {
						...conf.headers,
						'x-descope-sdk-name': 'react',
						'x-descope-sdk-version': BUILD_VERSION
					};
					return conf;
				}
			}
		});
	}, [projectId, baseUrl]);

	useEffect(() => {
		if (!sdk || !isBrowser) {
			return undefined;
		}

		const unsubscribeSessionToken = (sdk as Sdk).onSessionTokenChange(
			setSessionToken
		);
		const unsubscribeUser = (sdk as Sdk).onUserChange(setUser);
		return () => {
			unsubscribeSessionToken?.();
			unsubscribeUser?.();
		};
	}, [sdk]);

	const value = useMemo<IAuthContext>(
		() => ({
			sdk,
			projectId,
			baseUrl,
			user,
			sessionToken,
			setUser,
			setSessionToken
		}),
		[sessionToken, user, projectId, baseUrl]
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.defaultProps = {
	baseUrl: '',
	children: undefined
};

export default AuthProvider;
