// import DescopeWc from '@descope/web-component';
// '@descope/web-js-sdk' is a dependency of '@descope/web-component'
// and we want to use the same version that is used there
// eslint-disable-next-line import/no-extraneous-dependencies
import createCoreSdk from '@descope/core-js-sdk';
import createSdk from '@descope/web-js-sdk';
import React, { DOMAttributes } from 'react';

// declare class _DescopeWc extends HTMLElement {
//     #private;
//     static get observedAttributes(): string[];
//     constructor();
//     get 'project-id'(): string;
//     get 'flow-id'(): string;
//     get 'base-url'(): string;
//     get tenant(): string;
//     connectedCallback(): void;
//     disconnectedCallback(): void;
//     attributeChangedCallback(attrName: string, oldValue: string, newValue: string): void;
// }

declare global {
	namespace JSX {
		interface IntrinsicElements {
			['descope-wc']: DescopeCustomElement;
		}
	}
}

export type CoreSdk = ReturnType<typeof createCoreSdk>;

export type Sdk = ReturnType<typeof createSdk>;

export type CustomEvents<K extends string> = {
	[key in K]: (event: CustomEvent) => void;
};

export type CustomElement<T, K extends string = ''> = Partial<
	T &
		DOMAttributes<T> & {
			children: React.ReactChild;
			ref: React.Ref<HTMLElement>;
		} & CustomEvents<`on${K}`>
>;

export type DescopeCustomElement = CustomElement<
	HTMLElement,
	'success' | 'error'
> & {
	tenant: string;
};

export enum UserStatus {
	enabled = 'enabled',
	disabled = 'disabled',
	invited = 'invited',
	unknown = 'unknown'
}

export interface IExternalID {
	id: string;
	type?: string;
}

export interface User {
	externalIDs?: IExternalID[];
	displayName?: string;
	project?: string;
	logoutTime?: number;
	createTime?: number;
	email?: string;
	phoneNumber?: string;
	status?: UserStatus;
	verifiedEmail?: boolean;
	verifiedPhone?: boolean;
	tenants?: string[];
}

export interface IAuth {
	authenticated: boolean;
	user?: User;
	sessionToken?: string;
	logoutAll: Sdk['logoutAll'];
	logout: Sdk['logout'];
	me: Sdk['me'];
	getJwtRoles: Sdk['getJwtRoles'];
	getJwtPermissions: Sdk['getJwtPermissions'];
}

export interface IAuthContext {
	projectId: string;
	baseUrl?: string;
	user?: User;
	sessionToken?: string;
	sdk?: Sdk | CoreSdk;
	setUser: React.Dispatch<React.SetStateAction<User>>;
	setSessionToken: React.Dispatch<React.SetStateAction<string>>;
}

export interface DescopeProps {
	flowId: string;
	onSuccess?: DescopeCustomElement['onsuccess'];
	onError?: DescopeCustomElement['onerror'];
	tenant?: string;
}

export type DefaultFlowProps = Omit<DescopeProps, 'flowId'>;
