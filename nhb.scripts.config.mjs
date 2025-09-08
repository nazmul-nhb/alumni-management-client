// @ts-check

import { defineScriptConfig } from 'nhb-scripts';

export default defineScriptConfig({
	format: {
		args: ['--write'],
		files: ['src', 'nhb.scripts.config.mjs'],
		ignorePath: '.prettierignore',
	},
	commit: {
		runFormatter: true,
	},
	build: {
		distFolder: 'dist',
		deleteDist: false,
		commands: [{ cmd: 'tsc' }, { cmd: 'vite build' }],
	},
});
