import * as path from 'path'
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), 
    // testPlugin()
  ],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
  resolve: {
    alias: {
      $lib: path.resolve('./src/lib'),
    }
  },
};

export default config;
