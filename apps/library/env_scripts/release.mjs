import fs from 'fs'

const build = async () => {
  await $`pnpm build`
  // await $`cd release`
  // await $`find . ! -name '.git' -delete`
  // await $`cp ../dist/*.* .`
  
  // await $`git init && git add -A && git commit -m "Initial commit"`

  // await $`git remote add origin git@gitlab.innotech.me:frontend/im-library.git`
  // await $`git push -f --set-upstream origin master`
}

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

await build()

const version = readVersion()
writeVersionToRelease(version)
