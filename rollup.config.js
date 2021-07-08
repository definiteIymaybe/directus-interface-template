import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import sass from 'node-sass';

export default {
	input: 'src/index.js',
	output: {
		format: 'es',
		file: 'dist/index.js',
	},
	external: ['vue', '@directus/extension-sdk'],
	plugins: [
		vue({ preprocessStyles: true }),
		postcss({
			preprocessor: (content, id) =>
				new Promise((resolve, reject) => {
					const result = sass.renderSync({ file: id });
					resolve({ code: result.css.toString() });
				}),
		}),
		nodeResolve(),
		commonjs(),
		process.env.NOTERSER ? null : terser(),
	],
};
