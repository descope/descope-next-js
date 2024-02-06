'use client';
import React, { ComponentType, ComponentProps } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import {
	Descope as DescopeWC,
	SignInFlow as SignInFlowWC,
	SignUpFlow as SignUpFlowWC,
	SignUpOrInFlow as SignUpOrInFlowWC
} from '@descope/react-sdk';

type DescopeWCProps = ComponentProps<typeof DescopeWC>;
type SignInFlowProps = ComponentProps<typeof SignInFlowWC>;
type SignUpFlowProps = ComponentProps<typeof SignUpFlowWC>;
type SignUpOrInFlowProps = ComponentProps<typeof SignUpOrInFlowWC>;


type AdditionalProps = {
  redirectAfterSuccess?: string;
  redirectAfterError?: string;
};

type DynamicComponentProps = {
  onSuccess?: (...args: any[]) => void;
  onError?: (...args: any[]) => void;
};

// Generalized function to dynamically import components from @descope/react-sdk
// Dynamic is needed because the Descope components has a side effect us
// and NextJS will load the page on the server even if it is a client side only page
function dynamicDescopeComponent<T extends ComponentType<DynamicComponentProps>>(componentName: string) {
	return dynamic<ComponentProps<T> & AdditionalProps>(
		async () => {
			const DescopeComponents = await import('@descope/react-sdk');
			const Component = DescopeComponents[componentName];
      return ({ redirectAfterSuccess, redirectAfterError, ...props }:
				ComponentProps<T> & AdditionalProps) => {
				const router = useRouter();
				const modifiedProps = { ...props };

				if (redirectAfterSuccess) {
					modifiedProps.onSuccess = (...args) => {
						console.log('@@@ onSuccess called', {
							redirectAfterSuccess,
							args
						});
						if (props.onSuccess) {
							props.onSuccess(...args);
						}

						console.log('@@@ pushing ', redirectAfterSuccess);
						router.push(redirectAfterSuccess);
					};
				}

				if (redirectAfterError) {
					modifiedProps.onError = (...args) => {
						if (props.onError) {
							props.onError(...args);
						}
						router.push(redirectAfterError);
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


export const Descope = dynamicDescopeComponent<React.ComponentType<DescopeWCProps>>('Descope');
export const SignInFlow = dynamicDescopeComponent<React.ComponentType<SignInFlowProps>>('SignInFlow');
export const SignUpFlow = dynamicDescopeComponent<React.ComponentType<SignUpFlowProps>>('SignUpFlow');
export const SignUpOrInFlow = dynamicDescopeComponent<React.ComponentType<SignUpOrInFlowProps>>('SignUpOrInFlow');
