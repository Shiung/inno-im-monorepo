import * as path from 'path'
import { sveltekit } from '@sveltejs/kit/vite'
import { svelteSVG } from 'rollup-plugin-svelte-svg'

const svelteSVGPlugin = () => svelteSVG({
  svgo: {},
  enforce: 'pre',
})

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
    sveltekit(),
    svelteSVGPlugin()
  ],
  resolve: {
    alias: {
      $lib: path.resolve('./src/lib'),
    }
  },
};

export default config;
