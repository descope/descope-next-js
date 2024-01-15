import typescript from '@rollup/plugin-typescript';
import autoExternal from 'rollup-plugin-auto-external';
import define from 'rollup-plugin-define';
import dts from 'rollup-plugin-dts';
// import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';
const packageJson = require('./package.json');
// import swcPreserveDirectives from 'rollup-swc-preserve-directives';
import preserveDirectives from 'rollup-plugin-preserve-directives';
// import { swc } from 'rollup-plugin-swc3';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';

// Common plugins for all configurations
const commonPlugins = () => [
	define({
		replacements: {
			BUILD_VERSION: JSON.stringify(require('./package.json').version)
		}
	}),
	typescript({ tsconfig: './tsconfig.json' }),
	// swcPreserveDirectives(),
	preserveDirectives({ supressPreserveModulesWarning: true }),
	nodeResolve(),
	// commonjs(),
	autoExternal()
	// terser()
];

// Configurations for server, client and main entry
// const configurations = ['server', 'client', ''].map((entry) => {
const configurations = [''].map((entry) => {
	const inputPath = entry ? `src/${entry}/index.ts` : 'src/index.ts';
	// const outputPath = entry ? `dist/${entry}/index.js` : packageJson.module;
	const outputDir = entry ? `dist/${entry}` : 'dist';

	return {
		input: inputPath,
		external: [
			'next/server',
			'react',
			'next/dynamic',
			'next/router',
			'next/navigation'
		],
		onwarn(warning, warn) {
			if (
				warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
				warning.message.includes(`'use client'`)
			) {
				return;
			}
			warn(warning);
		},
		// externals: ['./shared'],
		output: [
			// {
			//   // file: outputPath,
			// 	dir: outputDir,
			//   sourcemap: true,
			//   format: 'cjs',
			// 	preserveModules: true
			// },
			{
				// file: outputPath.replace('.js', '.mjs'),
				dir: outputDir,
				sourcemap: true,
				format: 'esm',
				preserveModules: true
			}
		],
		plugins: commonPlugins()
	};
});

export default [
	...configurations,
	{
		input: './dist/dts/src/index.d.ts',
		output: [{ file: packageJson.types, format: 'esm' }],
		plugins: [
			dts(),
			del({
				hook: 'buildEnd',
				// asaf - think about a better way to do this
				targets: ['./dist/src', './dist/server/src', './dist/client/src']
			})
		]
	}
];
