import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import svelteSVG from 'vite-plugin-svelte-svg'

const svelteSVGPlugin = () => svelteSVG({
  svgoConfig: {},
  requireSuffix: false
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    svelteSVGPlugin()
  ],
})
