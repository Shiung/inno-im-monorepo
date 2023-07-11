import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import svelteSVG from 'vite-plugin-svelte-svg'
import { execSync } from 'child_process'

const packageJson = require('./package.json')

const svelteSVGPlugin = () => svelteSVG({
  svgoConfig: {},
  requireSuffix: false
})

const buildToPlatformNodeModules = () => {
  if (!process?.env?.PLATFORM_OUT_DIR) {
    console.warn("\x1b[33m[WARNING] buildToPlatformNodeModules miss PLATFORM_OUT_DIR variable which is defined in .env file, use default setting.\n\x1b[0m")
    return null
  }
  return {
    outDir: process.env.PLATFORM_OUT_DIR || 'dist',
    emptyOutDir: true
  }
}

const buildAsLibrary = () => {
  return ({
    build: {
      target: ['chrome70'],
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: {
          index: resolve(__dirname, './src/platform/index.ts'),
          app: resolve(__dirname, './src/platform/app.ts'),
          anchors: resolve(__dirname, './src/platform/anchors/index.ts'),
          streaming: resolve(__dirname, './src/platform/streaming/index.ts'),
          chatroom: resolve(__dirname, './src/platform/chatroom/index.ts'),
          expert: resolve(__dirname, './src/platform/expert/index.ts')
        },
        name: 'im-library',
        // the proper extensions will be added
        fileName: (format: string, entryName: string) => {
          if (format === 'es') return `${entryName}.js`
          if (format === 'cjs') return `${entryName}.cjs`
        }
      },
      ...(process.env.npm_lifecycle_event === 'build:library-watch' && buildToPlatformNodeModules())
    }
  })
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    define: {
      'process.env.name': JSON.stringify(packageJson.name),
      'process.env.version': JSON.stringify(packageJson.version),
      'process.env.commitHEAD': JSON.stringify(execSync('git rev-parse HEAD').toString()),
      'process.env.login': process.env.LOGIN
    },
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
  }
})
