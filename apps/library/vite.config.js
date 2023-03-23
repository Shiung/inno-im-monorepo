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
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
}

export default config
