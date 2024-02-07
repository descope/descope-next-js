import { defaults } from 'jest-config';
export default {
	...defaults,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
	setupFiles: ['./jest.setup.js'],
	transform: {
		'^.+\\.(js|jsx|ts|tsx|mjs)$': [
			'babel-jest',
			{ configFile: './babel.config.cjs' }
		]
	},
	testEnvironment: 'jsdom'
};
