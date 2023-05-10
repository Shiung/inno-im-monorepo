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
      entry: {
        index: resolve(__dirname, './src/platform/index.ts'),
        anchors: resolve(__dirname, './src/platform/anchors/index.ts'),
        streaming: resolve(__dirname, './src/platform/streaming/index.ts') 
      },
      name: 'im-library',
      // the proper extensions will be added
      fileName: (format: string, entryName: string) => {
        if (format === 'es') return `${entryName}.js`
        if (format === 'cjs') return `${entryName}.cjs`
      }
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
      $src: resolve('./src'),
      $assets: resolve('./src/assets'),
      $lib: resolve('./src/lib'),
      $containers: resolve('./src/containers'),
      $components: resolve('./src/components'),
      $pages: resolve('./src/pages'),
      $stores: resolve('./src/stores'),
      $types: resolve('./src/types'),
    }
  },
  ...(process.env.APP_ENV === 'library' && buildAsLibrary())
})
