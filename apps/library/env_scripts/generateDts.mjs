import { emitDts } from 'svelte2tsx'
import fs from 'fs'
import path from 'path'
import ts from 'typescript'

// ----- PLAN A -----
// fs.rmSync('types', { recursive: true, force: true })

// const originTsConfigContents = fs.readFileSync('tsconfig.json', { encoding: 'utf-8' })
// const { error, config: tsConfig } = ts.readConfigFile('tsconfig.json', ts.sys.readFile)
// if (error) await $`exit 1`

// delete tsConfig.references
// tsConfig.include = ['src/platform/**/*']
// tsConfig.exclude = ['src/platform/**/*.test.ts','src/platform/**/*.test.d.ts']
// tsConfig.compilerOptions.paths = {
//   ...tsConfig.compilerOptions.paths,
//   "utils/*": ["../../packages/utils/*"],
//   "ui/*": ["../../packages/ui/*"]
// }

// fs.writeFileSync('tsconfig.json', JSON.stringify(tsConfig, null, 2))

// await emitDts({
//   declarationDir: 'types',
//   svelteShimsPath: 'svelte2tsx/svelte-shims.d.ts'
// })

// fs.writeFileSync('tsconfig.json', originTsConfigContents)

// ----- PLAN B -----
const absPath = path.join(process.cwd(), 'src/platform')
const { error, config: tsConfig } = ts.readConfigFile('tsconfig.json', ts.sys.readFile)
if (error) await $`exit 1`

delete tsConfig.references
tsConfig.include = tsConfig.include.map(e => e.replace(/src/, '.'))
tsConfig.exclude = ['./**/*.test.ts']
tsConfig.compilerOptions.paths = { ...tsConfig.compilerOptions.paths, "utils/*": ['../../packages/utils/*'], "ui/*": ['../../packages/ui/*'] }

fs.writeFileSync(absPath + '/tsconfig.json', JSON.stringify(tsConfig, null, 2))
await emitDts({
  libRoot: absPath,
  declarationDir: '../types',
  svelteShimsPath: 'svelte2tsx/svelte-shims.d.ts'
})
fs.rmSync(absPath + '/tsconfig.json')