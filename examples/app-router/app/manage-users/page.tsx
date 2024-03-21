import { UserManagement } from '@descope/nextjs-sdk';

export default function ManageUsers() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh'
			}}
		>
			<h1>Manage Users</h1>
			<UserManagement
				tenant={process.env.NEXT_PUBLIC_DESCOPE_TENANT}
				widgetId="user-management-widget"
			/>
		</div>
	);
}
