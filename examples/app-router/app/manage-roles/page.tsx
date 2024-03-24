import { RoleManagement } from '@descope/nextjs-sdk';

export default function ManageRoles() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<h1>Manage Roles</h1>
			<RoleManagement
				tenant={process.env.NEXT_PUBLIC_DESCOPE_TENANT}
				widgetId="role-management-widget"
			/>
		</div>
	);
}
