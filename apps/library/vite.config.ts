import { resolve } from 'path'
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
  resolve: {
    alias: {
      $assets: resolve('./src/assets'),
      $lib: resolve('./src/lib'),
      $pages: resolve('./src/pages')
    }
  },
  build: {
     lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, './src/index.ts'),
      name: 'im-library',
      // the proper extensions will be added
      fileName: 'index',
    },
  }
})
