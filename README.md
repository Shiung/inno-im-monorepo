## IM-Monorepo

### Table Of Content
- [Requirement](#Requirement)
- [Folder Structure](#FolderStructure)
  - [apps](#FolderStructure_apps)
    - [library](#FolderStructure_apps_library)
    - [mockServer](#FolderStructure_apps_mockServer)
    - [uikit](#FolderStructure_apps_uikit)
  - [packages](#Packages)
    - [api](#Packages_api)
    - [assets](#Packages_assets)
    - [env-config](#Packages_env-config)
    - [eslint-config-custom](#Packages_eslint-config-custom)
    - [node-env](#Packages_node-env)
    - [protobuf](#Packages_protobuf)
    - [tailwind-config](#Packages_tailwind-config)
    - [ui](#Packages_ui)
    - [utils](#Packages_utils)
    - [vd-resource](#Packages_vd-resource)
- [Anchors](#Roadmap)
  - [mock](#Roadmap)
  - [language mechanism](#Roadmap)
  - [retry mechanism](#Roadmap)
- [Experts](#Roadmap)
  - [mock](#Roadmap)
  - [language mechanism](#Roadmap)
- [Chatroom](#Roadmap)
  - [websocket](#Roadmap)
  - [protobuf](#Roadmap)
  - [mock](#Roadmap)
- [Release Flow](#Features)
- [Environment Variables](#Usage)
- [Mock Data Server](#Configuration)
- [UI Kit](#Configuration)
- [Communication w/ Platform](#Example)
- [I18n](#About)
- [Theme](#Roadmap)
- [Api](#Roadmap)
- [ShellScript](#Roadmap)
- [Issues](#Roadmap)
- [Device](#Roadmap)

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
```shell
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
| |-- echo/ # 測試用 ws echo server (unused)
| |-- mock/ 
| |-- protobuf/ # ws protobuf server (deprecated)
| |-- stomp/ # 原本 ws stomp server (deprecated)
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