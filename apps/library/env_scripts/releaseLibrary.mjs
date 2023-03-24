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

const renewReleaseFolder = async () => {
  await $`rm -rf release`
  await $`git clone git@gitlab.innotech.me:frontend/im-library.git release`
}

const getReleasedVersion = async () => {
  let data = fs.readFileSync('./release/package.json', 'utf8')
  data = JSON.parse(data)
  return data.version
}

const returnOrExitIfVersionTheSame = async (releasedVer) => {
  const version = readVersion()

  if (releasedVer === version) {
    console.log('==================== release version cannot be the same ================================')
    await $`exit 1`
  }

  return version
}

const build = async () => {
  await $`pnpm build:library`
  await $`cd release && find * ! -name '.git' -delete`
  await $`cp ./dist/*.* ./release`
}

const pushToGit = async (version) => {
  await $`cd release && git add * && git commit -m "v${version}" && git push`
  await $`cd release && git tag v${version} && git push --tag`
}


renewReleaseFolder()
const releasedVer = getReleasedVersion()
const newVer = returnOrExitIfVersionTheSame(releasedVer)
console.log('version', newVer)
build()
writeVersionToRelease(newVer)
pushToGit(newVer)

