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
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json'
		},
		BUILD_VERSION: 'one.two.three'
	},
	testEnvironment: 'jsdom',
	transformIgnorePatterns: [
		// If there are node_modules not being correctly transpiled, you might need to adjust this pattern
		'node_modules/(?!(jose)/)'
	]
};
