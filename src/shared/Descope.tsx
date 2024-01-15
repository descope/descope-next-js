'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// load the Descope Flows components dynamically
// this is needed because the Descope components has a side effect us
// and NextJS will load the page on the server even if it is a client side only page

// - Asaf TODO
// 1. add redirectAfterDone to the props
// 2. export TS props instead any
// Generalized function to dynamically import components from @descope/react-sdk
function dynamicDescopeComponent(componentName) {
	return dynamic<any>(
		async () => {
			const DescopeComponents = await import('@descope/react-sdk');
			const Component = DescopeComponents[componentName];
			return ({ redirectAfterSuccess, redirectAfterError, ...props }) => {
				const router = useRouter();
				const modifiedProps = { ...props };

				if (redirectAfterSuccess) {
					modifiedProps.onSuccess = (...args) => {
						if (props.onSuccess) {
							props.onSuccess(...args);
						}
						router.push(redirectAfterSuccess);
					};
				}

				if (redirectAfterError) {
					modifiedProps.onError = (...args) => {
						if (props.onError) {
							props.onError(...args);
						}
						// router.push(redirectAfterError);
					};
				}

				return <Component {...modifiedProps} />;
			};
		},
		{
			ssr: false
		}
	);
}

export const Descope = dynamicDescopeComponent('Descope');
export const SignInFlow = dynamicDescopeComponent('SignInFlow');
export const SignUpFlow = dynamicDescopeComponent('SignUpFlow');
export const SignUpOrInFlow = dynamicDescopeComponent('SignUpOrInFlow');
