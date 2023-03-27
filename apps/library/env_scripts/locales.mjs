import fs from 'fs'
import fetch from 'node-fetch'
import { LANGUAGES } from 'node-env'

// const LOCALE_SERVER = 'http://locale.fd.innotech.me:5000'
const LOCALE_SERVER = 'http://172.28.40.189:5000'
const REPO_NAME = 'im-monorepo'
const LANG_FILEPATH = './src/locales'

const parseJsonDataToDict = (json) => {
  const dict = {}

  for (const [key, text] of Object.entries(json)) {
    const fileName = key.split('.')[0]

    if (!dict[fileName]) dict[fileName] = { [key]: text }
    else dict[fileName][key] = text
  }

  return dict
}

const clearLangFolder = async () => {
  await $`rm -rf ${LANG_FILEPATH}`
}

const genLangFiles = async (lang, dict) => {
  for (const [name, data] of Object.entries(dict)) {
    const fileName = `${lang}_${name.replace('/', '_')}`
    const filePath = `${LANG_FILEPATH}/${fileName}.json`

    await $`touch ${filePath}`
    fs.writeFileSync(`${filePath}`, JSON.stringify(data))
    $`echo "export { default as ${fileName} } from './${fileName}.json'" >> ${LANG_FILEPATH}/index.ts`
    $`echo "case '${fileName}': return () => import('./${fileName}.json')" >> ${LANG_FILEPATH}/fetcher.ts`
  }
}


await clearLangFolder()
await $`mkdir -p ${LANG_FILEPATH}`
await $`touch ${LANG_FILEPATH}/index.ts`
await $`touch ${LANG_FILEPATH}/fetcher.ts`
await $`echo "export default (path: string) => {\n  switch (path) {" >> ${LANG_FILEPATH}/fetcher.ts`

for (const lang of LANGUAGES) {
  const langData = await fetch(`${LOCALE_SERVER}/client/${REPO_NAME}/${lang}`)
  const json = await langData.json()

  const dict = parseJsonDataToDict(json)
  await genLangFiles(lang, dict)
}

await $`echo "default: return () => import('./en_US_common.json')" >> ${LANG_FILEPATH}/fetcher.ts`
await $`echo "}}" >> ${LANG_FILEPATH}/fetcher.ts`

