import { AccessKeyManagement } from '@descope/nextjs-sdk';

export default function ManageAccessKeys() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				maxWidth: '800px',
				border: '1px solid black'
			}}
		>
			<h1>Manage Access Keys</h1>
			<AccessKeyManagement
				tenant={process.env.NEXT_PUBLIC_DESCOPE_TENANT}
				widgetId="access-key-management-widget"
			/>
		</div>
	);
}
