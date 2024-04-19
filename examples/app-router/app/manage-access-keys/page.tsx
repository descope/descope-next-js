import { AccessKeyManagement } from '@descope/nextjs-sdk';

export default function ManageAccessKeys() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<h1>Manage Access Keys</h1>
			<AccessKeyManagement
				tenant={process.env.NEXT_PUBLIC_DESCOPE_TENANT}
				widgetId="access-key-management-widget"
			/>

			<h1>Manage My Access Keys</h1>
			<AccessKeyManagement
				tenant={process.env.NEXT_PUBLIC_DESCOPE_TENANT}
				widgetId="user-access-key-management-widget"
			/>
		</div>
	);
}
