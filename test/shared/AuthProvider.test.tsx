import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { AuthProvider as AuthProviderComp } from '@descope/react-sdk';
import AuthProvider from '../../src/shared/AuthProvider';

jest.mock('@descope/react-sdk', () => ({
	AuthProvider: jest.fn()
}));

describe('AuthProvider', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render and pass sessionTokenViaCookie as true by default', () => {
		render(<AuthProvider projectId="project1" />);
		expect(AuthProviderComp).toHaveBeenCalledWith(
			expect.objectContaining({
				sessionTokenViaCookie: true
			}),
			expect.anything() // This accounts for the second argument to a component function, which is the ref in class components
		);
	});

	it('should allow sessionTokenViaCookie to be overridden to false', () => {
		render(<AuthProvider projectId="project1" sessionTokenViaCookie={false} />);
		expect(AuthProviderComp).toHaveBeenCalledWith(
			expect.objectContaining({
				sessionTokenViaCookie: false
			}),
			expect.anything()
		);
	});
});
