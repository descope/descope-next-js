import { defaults } from 'jest-config';
export default {
	...defaults,
	setupFiles: ['./jest.setup.js'],
	transform: {
		'^.+\\.(js|jsx|ts|tsx|mjs)$': [
			'babel-jest',
			{ configFile: './babel.config.cjs' }
		]
	},
	testEnvironment: 'jsdom'
};
