import autoExternal from 'rollup-plugin-auto-external';
import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/cli.ts',
	output: {
		dir: 'dist',
		format: 'es',
	},
	plugins: [autoExternal(), typescript({ exclude: ['templates/**'] })],
};
