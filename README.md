# Descope SDK for NextJS

The Descope SDK for NextJS provides convenient access to the Descope for an application written on top of NextJS. You can read more on the [Descope Website](https://descope.com).

This SDK uses under the hood the Descope React SDK and Descope Node SDK
Refer to the [Descope React SDK](https://github.com/descope/react-sdk) and [Descope Node SDK](https://github.com/descope/node-sdk) for more details.

## Requirements

- The SDK supports NextJS version 13 and above.
- A Descope `Project ID` is required for using the SDK. Find it on the [project page in the Descope Console](https://app.descope.com/settings/project).

## Installing the SDK

Install the package with:

```bash
npm i --save @descope/nextjs-sdk
```

## Usage

This section contains guides for App router and Pages router.
For Pages router, see the [Pages Router](#pages-router) section.

### App Router

#### Wrap your app layout with Auth Provider

```js
// src/app/layout.tsx

import { AuthProvider } from '@descope/nextjs-sdk';

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<AuthProvider projectId="your-descope-project-id">
			<html lang="en">
				<body>{children}</body>
			</html>
		</AuthProvider>
	);
}
```

Note: `AuthProvider` uses `sessionTokenViaCookie` by default, in order that the [AuthMiddleware](<#Require-authentication-for-application-(Middleware)>) will work out of the box.

#### Use Descope to render Flow

You can use **default flows** or **provide flow id** directly to the Descope component

```js
// Login page, e.g. src/app/sign-in.tsx
import { Descope } from '@descope/nextjs-sdk';
// you can choose flow to run from the following without `flowId` instead
// import { SignInFlow, SignUpFlow, SignUpOrInFlow } from '@descope/nextjs-sdk'

const Page = () => {
	return (
		<Descope
			flowId="sign-up-or-in"
			onSuccess={(e) => console.log('Logged in!')}
			onError={(e) => console.log('Could not logged in!')}
			redirectAfterSuccess="/"
			// redirectAfterError="/error-page"
		/>
	);
};
```

Refer to the [Descope React SDK Section](https://github.com/descope/react-sdk?tab=readme-ov-file#2-provide-flow-id) for a list of available props.

**Note:** Descope is a client component. if the component that renders it is a server component, you cannot pass `onSuccess`/`onError`/`errorTransformer`/`logger` props because they are not serializable. To redirect the user after the flow is completed, use the `redirectAfterSuccess` and `redirectAfterError` props.

#### Client Side Usage

Use the `useDescope`, `useSession` and `useUser` hooks in your components in order to get authentication state, user details and utilities

This can be helpful to implement application-specific logic. Examples:

- Render different components if current session is authenticated
- Render user's content
- Logout button

Note: these hooks should be used in a client component only (For example, component with `use client` notation).

```js
'use client';
import { useDescope, useSession, useUser } from '@descope/nextjs-sdk/client';
import { useCallback } from 'react';

const App = () => {
	// NOTE - `useDescope`, `useSession`, `useUser` should be used inside `AuthProvider` context,
	// and will throw an exception if this requirement is not met
	// useSession retrieves authentication state, session loading status, and session token
	const { isAuthenticated, isSessionLoading, sessionToken } = useSession();
	// useUser retrieves the logged in user information
	const { user } = useUser();
	// useDescope retrieves Descope SDK for further operations related to authentication
	// such as logout
	const sdk = useDescope();

	if (isSessionLoading || isUserLoading) {
		return <p>Loading...</p>;
	}

	const handleLogout = useCallback(() => {
		sdk.logout();
	}, [sdk]);

	if (isAuthenticated) {
		return (
			<>
				<p>Hello {user.name}</p>
				<button onClick={handleLogout}>Logout</button>
			</>
		);
	}

	return <p>You are not logged in</p>;
};
```

#### Server Side Usage

##### Require authentication for application (Middleware)

You can use NextJS Middleware to require authentication for a page/route or a group of pages/routes.

Descope SDK provides a middleware function that can be used to require authentication for a page/route or a group of pages/routes.

```js
// src/middleware.ts
import { authMiddleware } from '@descope/nextjs-sdk/server'

export default authMiddleware({
	// The Descope project ID to use for authentication
	// Defaults to process.env.DESCOPE_PROJECT_ID
	projectId: 'your-descope-project-id'

	// The URL to redirect to if the user is not authenticated
	// Defaults to process.env.SIGN_IN_ROUTE or '/sign-in' if not provided
	// NOTE: In case it contains query parameters that exist in the original URL, they will override the original query parameters. e.g. if the original URL is /page?param1=1&param2=2 and the redirect URL is /sign-in?param1=3, the final redirect URL will be /sign-in?param1=3&param2=2
	redirectUrl?: string

	// An array of public routes that do not require authentication
	// In addition to the default public routes:
	// - process.env.SIGN_IN_ROUTE or /sign-in if not provided
	// - process.env.SIGN_UP_ROUTE or /sign-up if not provided
	publicRoutes?: string[]
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
```

##### Read session information in server side

use the `session()` helper to read session information in Server Components and Route handlers.

Note: `session()` requires the `authMiddleware` to be used for the Server Component or Route handler that uses it.

Server Component:

```js
// src/app/page.tsx

import { session } from '@descope/nextjs-sdk/server';

async function Page() {
	const sessionRes = session();
	if (!sessionRes) {
		// ...
	}
	// Use the session jwt or parsed token
	const { jwt, token } = sessionRes;
}
```

Route handler:

```js
// src/pages/api/routes.ts
export async function GET() {
	const currSession = session();
	if (!currSession.isAuthenticated) {
		// ...
	}

	// Use the session jwt or parsed token
	const { jwt, token } = currSession;
}
```

#### Access Descope SDK in server side

Use `createSdk` function to create Descope SDK in server side.

Refer to the [Descope Node SDK](https://github.com/descope/node-sdk/?tab=readme-ov-file#authentication-functions) for a list of available functions.

Usage example in Route handler:

```js
// src/pages/api/routes.ts
import { createSdk } from '@descope/nextjs-sdk/server';

const sdk = createSdk({
	// The Descope project ID to use for authentication
	// Defaults to process.env.DESCOPE_PROJECT_ID
	projectId: 'your-descope-project-id',

	// The Descope management key to use for management operations
	// Defaults to process.env.DESCOPE_MANAGEMENT_KEY
	managementKey: 'your-descope-management-key'

	// Optional: Descope API base URL
	// Defaults to process.env.DESCOPE_BASE_URL
	// baseUrl: 'https://...'
});

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const loginId = searchParams.get('loginId');

	const { ok, data: user } = await sdk.management.user.load(loginId);
	if (!ok) {
		// ...
	}
	// Use the user data ...
}
```

### Pages Router

This section is Working in progress :-)
In the meantime, you can see the example in the [Pages Router](/examples/pages-router/) folder.

## Code Example

You can find an example react app in the [examples folder](./examples). - [App Router](/examples/app-router/) - [Pages Router](/examples/pages-router/)

## Learn More

To learn more please see the [Descope Documentation and API reference page](https://docs.descope.com/).

## Contact Us

If you need help you can email [Descope Support](mailto:support@descope.com)

## License

The Descope SDK for React is licensed for use under the terms and conditions of the [MIT license Agreement](./LICENSE).
