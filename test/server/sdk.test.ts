import descopeSdk from '@descope/node-sdk';
import { createSdk, getGlobalSdk } from '../../src/server/sdk';

jest.mock('@descope/node-sdk', () => jest.fn());

describe('sdk', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		jest.resetModules(); // Reset modules if you are changing env vars
	});

	describe('createSdk', () => {
		it('should create a new sdk with parameters', () => {
			const config = { projectId: 'project1', managementKey: 'key1' };
			createSdk(config);

			expect(descopeSdk).toHaveBeenCalledWith(
				expect.objectContaining({
					projectId: 'project1',
					managementKey: 'key1',
					baseHeaders: expect.any(Object) // Adjust according to your baseHeaders structure
				})
			);
		});

		it('should create a new sdk with env variables', () => {
			process.env.DESCOPE_PROJECT_ID = 'envProjectId';
			process.env.DESCOPE_MANAGEMENT_KEY = 'envManagementKey';
			process.env.DESCOPE_BASE_URL = 'envBaseUrl';

			createSdk();

			expect(descopeSdk).toHaveBeenCalledWith(
				expect.objectContaining({
					projectId: 'envProjectId',
					managementKey: 'envManagementKey',
					baseUrl: 'envBaseUrl',
					baseHeaders: expect.any(Object)
				})
			);

			// Clean up environment variables to avoid side effects
			delete process.env.DESCOPE_PROJECT_ID;
			delete process.env.DESCOPE_MANAGEMENT_KEY;
			delete process.env.DESCOPE_BASE_URL;
		});
	});

	describe('getGlobalSdk', () => {
		it('should create a new sdk if one does not exist', () => {
			const config = { projectId: 'project1' };
			getGlobalSdk(config);

			expect(descopeSdk).toHaveBeenCalledWith(
				expect.objectContaining({
					projectId: 'project1'
					// Include other default parameters as needed
				})
			);
		});

		it('should return the existing sdk', () => {
			const sdk1 = getGlobalSdk({ projectId: 'project1' });
			const sdk2 = getGlobalSdk({ projectId: 'project1' });

			expect(sdk1).toBe(sdk2); // Verify that the same SDK instance is returned
		});

		it("should throw an error if no projectId is provided and it's not in env", () => {
			// Ensure the environment variable is not set
			delete process.env.DESCOPE_PROJECT_ID;

			expect(() => getGlobalSdk()).toThrow(
				'Descope project ID is required to create the SDK'
			);
		});
	});
});
