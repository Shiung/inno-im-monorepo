import { emitDts } from 'svelte2tsx'
import fs from 'fs'
import path from 'path'
import ts from 'typescript'
import { createRequire } from 'node:module'

// ----- PLAN A -----
// fs.rmSync('types', { recursive: true, force: true })

// const originTsConfigContents = fs.readFileSync('tsconfig.json', { encoding: 'utf-8' })
// const { error, config: tsConfig } = ts.readConfigFile('tsconfig.json', ts.sys.readFile)
// if (error) await $`exit 1`

// tsConfig.include = tsConfig.include.map(e => e.replace(/src/, 'src/platform'))
// tsConfig.exclude = ['**/*.test.ts']

// fs.writeFileSync('tsconfig.json', JSON.stringify(tsConfig, null, 2))

// const require = createRequire(import.meta.url)

// await emitDts({
//   declarationDir: 'types',
//   svelteShimsPath: require.resolve('svelte2tsx/svelte-shims.d.ts')
// })

// fs.writeFileSync('tsconfig.json', originTsConfigContents)

// ----- PLAN B -----
fs.rmSync('types', { recursive: true, force: true })

const absPath = path.join(process.cwd(), 'src/platform')
const { error, config: tsConfig } = ts.readConfigFile('tsconfig.json', ts.sys.readFile)
if (error) await $`exit 1`

tsConfig.include = tsConfig.include.map(e => e.replace(/src/, '.'))
tsConfig.exclude = ['./**/*.test.ts']

fs.writeFileSync(absPath + '/tsconfig.json', JSON.stringify(tsConfig, null, 2))

const require = createRequire(import.meta.url)

await emitDts({
  libRoot: absPath,
  declarationDir: '../types',
  svelteShimsPath: require.resolve('svelte2tsx/svelte-shims.d.ts')
})

fs.rmSync(absPath + '/tsconfig.json')