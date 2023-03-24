import fs from 'fs'

const readVersion = () => {
  let data = fs.readFileSync('./package.json', 'utf8')
  data = JSON.parse(data)
  return data.version
}

const writeVersionToRelease = (version) => {
  let data = fs.readFileSync('./library_package.json', 'utf8')
  data = JSON.parse(data)
  data.version = version
  fs.writeFileSync('./release/package.json', JSON.stringify(data))
}

await $`rm -rf release`
await $`git clone git@gitlab.innotech.me:frontend/im-library.git release`

let data = fs.readFileSync('./release/package.json', 'utf8')
data = JSON.parse(data)
const nowVersion = data.version
const version = readVersion()

if (nowVersion === version) {
  console.log('==================== release version cannot be the same ================================')
  await $`exit 1`
}

console.log('version', version)

await $`pnpm build`
await $`cd release && find * ! -name '.git' -delete`
await $`cp ./dist/*.* ./release`

writeVersionToRelease(version)

await $`cd release && git add * && git commit -m "v${version}" && git push`
await $`cd release && git tag v${version} && git push --tag`
