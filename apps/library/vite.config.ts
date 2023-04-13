import { resolve } from 'path'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import svelteSVG from 'vite-plugin-svelte-svg'

const svelteSVGPlugin = () => svelteSVG({
  svgoConfig: {},
  requireSuffix: false
})

const buildAsLibrary = () => ({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, './src/index.ts'),
      name: 'im-library',
      // the proper extensions will be added
      fileName: 'index',
    }
  }
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
      $containers: resolve('./src/containers'),
      $pages: resolve('./src/pages'),
      $stores: resolve('./src/stores'),
      $types: resolve('./src/types'),
    }
  },
  ...(process.env.APP_ENV === 'library' && buildAsLibrary())
})
