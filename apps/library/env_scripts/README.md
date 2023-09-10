### Release Flow

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

---
#### release script flow chart

<div align='center'>

![release flow](./images/release%20flow.drawio.png)

</div>