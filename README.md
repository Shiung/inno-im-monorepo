## IM-Monorepo

- [Requirement](#Requirement)
- [Folder Structure](#FolderStructure)
  - [apps](#FolderStructure_apps)
    - [library](#FolderStructure_apps_library)
    - [mockServer](#FolderStructure_apps_mockServer)
    - [uikit](#FolderStructure_apps_uikit)
  - [packages](#FolderStructure_packages)
    - [api](#FolderStructure_packages_api)
    - [assets](#FolderStructure_packages_assets)
    - [env-config](#FolderStructure_packages_env-config)
    - [eslint-config-custom](#FolderStructure_packages_eslint-config-custom)
    - [node-env](#FolderStructure_packages_node-env)
    - [protobuf](#FolderStructure_packages_protobuf)
    - [tailwind-config](#FolderStructure_packages_tailwind-config)
    - [ui](#FolderStructure_packages_ui)
    - [utils](#FolderStructure_packages_utils)
    - [vd-resource](#FolderStructure_packages_vd-resource)
- [Anchors](#Roadmap)
  - [mock](#Roadmap)
  - [language mechanism](#Roadmap)
  - [retry mechanism](#Roadmap)
- [Experts](#Roadmap)
  - [mock](#Roadmap)
- [Chatroom](#Roadmap)
  - [websocket](#Roadmap)
  - [protobuf](#Roadmap)
  - [mock](#Roadmap)
- [Release Flow](#ReleaseFlow)
- [Environment Variables](#EnvironmentVariables)
- [Mock Data Server](#MockDataServer)
- [UI Kit](#UIKit)
- [Communication w/ Platform](#Communication_w/_Platform)
- [I18n](#I18n)
- [Theme](#Theme)
- [Api](#Api)
- [ShellScript](#ShellScript)
- [Issues](#Issues)

---

### <a name='Requirement'></a>Requirement 

Build Tool : [Turbo ≥ 1](https://turbo.build/repo)
Package Manager : [Pnpm ≥ v8](https://pnpm.io)
Environment : [Node ≥ v16.x](https://nodejs.org/en)

>
> [Pnpm v.s Node Version Compatibility](https://pnpm.io/zh-TW/installation#compatibility)
>
> turbo 需要安裝在電腦全域的 npm module 
> (未嘗試過，或許能安裝在專案內)

---

### <a name='FolderStructure'></a>Folder Structure 

#### <a name='FolderStructure_apps'></a>apps

主要產品資料夾，所有業務邏輯與代碼都會在這個專案下
在專案根目錄下運行已下指令，會透過 turbo 併發執行底下三個子模組的 dev

```bash
# im-monorepo/
pnpm dev

# same as
# im-monorepo/apps/library pnpm dev
# im-monorepo/apps/mockServer pnpm dev
# im-monorepo/apps/uikit pnpm dev
``` 

##### <a name='FolderStructure_apps_library'></a>library
主要 IM Library，裡面包含所有提供給 `universe-portal-wap` 使用的組件，會放在 `platform/` 子資料夾下。

```bash
|-- env_scripts # 部署/語系 shell 腳本
|-- src
| |-- api/ # 共用的 fetch api wrapper function
| |-- assets/ # 需要打包的靜態資源
| |-- components/ # 共用元件
| |-- containers/ # 業務相關共用元件
| |-- pages/ # 廣場頁面
| |-- platform/ # 供平台引入的元件、狀態管理
| |-- routes/ # 廣場路由
| |-- stores/ # 狀態管理
| |-- utils/ # 業務相關共用函式
| |-- app.css # tailwind preset
| |-- app.d.ts # 自定義 ts 宣告
| |-- App.svelte # 廣場入口組件
| |-- common.css # global 樣式
| |-- commonInit.ts # 入口組件
| |-- constant.ts # 共用常數
| |-- main.ts # 廣場入口
| |-- types.ts # 共用型別宣告
| |-- vite-env.d.ts # client 相關型別宣告

```

##### <a name='FolderStructure_apps_mockServer'></a>mockServer
前端測試用 mock data server，內含 http request api、websocket 的 mock 測試。

```bash
|-- src
| |-- echo/ # (unused)
| |-- mock/ # 測試用 mock資 料
| |-- protobuf/ # ws protobuf server
| |-- stomp/ # (unused)
| |-- index.ts # 入口
| |-- moduleDict.ts # mock data map
| |-- types.ts # common types
```

##### <a name='FolderStructure_apps_uikit'></a>uikit
常用的 ui 元件展示用頁面，元件大多都來自 packages/ui 底下。

```bash
|-- src
| |-- App.svelte
| |-- app.css
| |-- app.d.ts
| |-- assets
| |-- components
| |-- main.ts
| |-- routes
| |-- vite-env.d.ts
```

---

#### <a name='FolderStructure_packages'></a>packages

用來存放在多個不同子專案都共用的函式、參數或規範。

##### <a name='FolderStructure_packages_api'></a>api
存放打業務 api 的模組．內含 http request api、websocket 的 mock 測試。

```bash
| |--core/ # 存放核心 ws 模組
| |--echo/ # (unused)
| |--im/ # (unused)
| |--stompMaster/ # (unused)
| |--wsMaster/ # im ws 入口
| |--base.ts # 存放核心 api 模組(可以移到core裏)
| |--index.ts # 入口
| |--types.ts # api 型別宣告
```

##### <a name='FolderStructure_packages_assets'></a>assets

(unused)

##### <a name='FolderStructure_packages_env-config'></a>env-config

取圖匡環境參數的模組，目前會與 `universe-portal-wap/` 配合，在開發環境下 `universe-portal-wap/` 專案會暴露 `_env_` 變數給 im 使用。

##### <a name='FolderStructure_packages_eslint-config-custom'></a>eslint-config-custom

跨專案共用的 eslint-config，會在各專案下的 `.eslintrc.cjs` 引入。

```js
// root/
module.exports = {
  extends: ['custom']
};
```

##### <a name='FolderStructure_packages_node-env'></a>node-env

存放在 nodejs 環境下需要的環境參數，像是 library 內的腳本使用參數。

##### <a name='FolderStructure_packages_protobuf'></a>protobuf

存放跨專案共用的 protobuf encoding/decoding 模組，又分為給 client/server 端的兩個入口。

##### <a name='FolderStructure_packages_tailwind-config'></a>tailwind-config

存放跨專案共用的 tailwind css config。 ex: 業主色、裝置尺寸

##### <a name='FolderStructure_packages_ui'></a>ui

存放跨專案共用的 UI 組件。 ex: 按鈕、彈窗、Player

##### <a name='FolderStructure_packages_utils'></a>utils

存放跨專案共用的 utils。

##### <a name='FolderStructure_packages_vd-resource'></a>vd-resource

放各業主會使用到的靜態資源。

---

### <a name='ReleaseFlow'></a>Release Flow

im-monorepo 現在沒有透過 gitlab CI/CD 去做上版控制，是透過執行專案底下的
`apps/library/env_scripts/releaseLibrary.mjs` 腳本做上版動作。

```bash

cd apps/library

pnpm run release
```

可能失敗原因：
1. type check failed
2. 版號與遠端 im-library repo 一致。

[流程圖](./apps/library/env_scripts/README.md)

---

### <a name='EnvironmentVariables'></a>Environment Variables

#### window.\_env\_
線上環境：
    與 `universe-portal-wap` 專案或其他公司專案一樣，都是透過 devops 提供的圖框環境參數來決定一些環境變數，ex: api url, ws url, translate, etc。
本地開發：
    若是要測試在平台專案下經過 build 的 `im-library`，
    `universe-portal-wap` 內會在 `NODE_ENV` 的值是 `development` 時，
    暴露它所使用的開發環境的 `\_env\_` 到 `window` 下供 im-library 抓取。

#### localStorage

目前有一些供測試或是與平台相關的 localStorage 變數在使用：

1. `imVIPNotify` : 記錄專家頁面隱藏金色鎖頭的過期時間
2. `dev` : 設為 `true` 打開 ws 的 `debug mode`，可以參考 [聊天室文件](https://innotech.atlassian.net/wiki/spaces/GDIM/pages/2581922325/IM#%E7%B7%9A%E4%B8%8A%E9%99%A4%E9%8C%AF%E5%B7%A5%E5%85%B7)
3. `locale` : im 內的語系，會與平台的 `locale.current` 同步
4. `imAllowTranslate` : 是否打開翻譯的參數，
  `allow` = 是
  `not-allow` = 否
  `default` = 看預設值
5. `mock` : 設為 `true` 打開 mock 機制，訪問 api 與連線 ws 的請求會轉打專案內的 mock server
6. `dev_login` : 設為 `true` 可以在 im 專案去執行平台登入動作，以利測試

---

### <a name='MockDataServer'></a>Mock Data Server

mock server 有分為兩種，http request & websocket。
是用 `nodejs` 原生提供的 `http` 模組去啟動一個 local server，
host 在 http://localhost:5174 domain 底下。

在設置 localStorage `mock` 為 `true` 時會將專案內的 api 請求與 ws 連線都轉為連到這個 domain。

而假資料是透過 [mockjs](https://github.com/nuysoft/Mock/wiki) 這個 package 去產生的。
可以參考：`apps/mockServer/src/mock/im/*`。

#### http request

細節：`apps/mockServer/src/index.ts`
在串接一個新的 api 時，可以在 `apps/mockServer/src/mock/im/` 新增自己的 mock api 資料。
資料型別宣告： `apps/mockServer/src/types.ts`
通常會將 `packages/api/im/types` 內定義的 api 資料型別拿來在 mock data 定義，要做[型別斷言](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)。

#### websocket connection

細節：`apps/mockServer/src/protobuf/im/index.ts`

---

### <a name='UIKit'></a>UI Kit

---

### <a name='Communication_w/_Platform'></a>Communication w/ Platform

---

### <a name='I18n'></a>I18n

---

### <a name='Theme'></a>Theme

---

### <a name='Api'></a>Api

---

### <a name='ShellScript'></a>ShellScript

---

### <a name='Device'></a>Device

---

### <a name='Issues'></a>Issues

