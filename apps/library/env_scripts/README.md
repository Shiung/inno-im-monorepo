### env_scripts

#### releaseLibrary

1. 現在沒有透過 gitlab CI/CD 去做上版控制，是透過執行專案底下的 `apps/library/env_scripts/releaseLibrary.mjs` 腳本做上版動作。

```bash
cd apps/library

pnpm run release
```

> 可能失敗原因：
> 1. type check failed
> 2. 版號與遠端 im-library repo 一致。
>
> 之後可能會調整成走 gitlab CI/CD，能更嚴格的做版控與上版管理。

2. 去 `universe-portal-wap` 專案創建分支並發更新 `im-library` 的 MR。

以 release 版本為 `4.10.1`為例：

```bash
cd {YOUR_PROJECT_PATH}/universe-portal-wap/

# git checkout {CURRENT-RELEASE-BRANCH}
git checkout release/4.10.x

# update release branch version
git pull

# create im release branch
git checkout -b im/release-4.10.1

# use sed command in MacOS
# or manually open package.json and change im-library's version
sed -i '' -e 's/"im-library":\(.*\)semver:.*\"/"im-library":\1semver:4.10.1"/' ./package.json

# installed packages again
yarn

# add package.json and yarn.lock
git add : 

# make commit, push
git commit -m 'chore: im-library release 4.10.1'
git push origin im/release-4.10.1

# make pull request and ask for code review
```

##### script flow chart

<div align='center'>

![release flow](./images/release%20flow.drawio.png)

</div>

---

#### locales

與其他 FE 專案一樣，會將 i18n 的 mapping 表放在 [i18n 服務](http://locale.fd.innotech.me/#/im-monorepo) 上，專案會在啟動 dev 跟 build 的時候去執行 nodejs 腳本將語系檔下載下來放至專案內一起打包。

在執行 `locales.mjs` 腳本時會將 key 中第一個點前面相同的 `category` 抓出來放在一個 `json` 檔案裡，再根據語系去產出 `json` 檔，然後產出一個 `fetcher.ts` 檔案做 `dynamic lazy import`。

細節：`apps/library/env_scripts/locales.mjs`


```bash
# {locale}_common.json
common.confirm
common.cancel

# {locale}_anchor.json
anchor.all
anchor.life

# {locale}_expert.json
expert.plan
expert.plan.prediction

# {category}.{key1}.{key2}...
```

在專案內引入語系可以參考 [src/stores/locale.ts](../src/stores/locale.ts)。