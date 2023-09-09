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
  - [language mechanism](#Roadmap)
  - [retry mechanism](#Roadmap)
- [Chatroom](#Roadmap)
  - [websocket](#Roadmap)
  - [protobuf](#Roadmap)
- [Release Flow](#ReleaseFlow)
- [Environment Variables](#EnvironmentVariables)
- [Local Development](#LocalDevelopment)
- [Mock Data Server](#MockDataServer)
- [Embedded In Platform](#Embedded_In_Platform)
- [I18n](#I18n)
- [Theme](#Theme)
- [Api](#Api)
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
> (或許能只安裝在專案內，需測試)

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
| |-- main.ts # 專案入口
| |-- types.ts # 共用型別宣告
| |-- vite-env.d.ts # client 相關型別宣告

```

##### <a name='FolderStructure_apps_mockServer'></a>mockServer
前端測試用 mock data server，內含 http request api、websocket 的 mock 測試。

```bash
|-- src
| |-- echo/ # (unused)
| |-- mock/ # 測試用 mock資料
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
4. `mock` : 設為 `true` 改打 mock data server
5. `dev_login` : 設為 `true` 可以在 im 專案執行平台登入動作
6. `imAllowTranslate` : 是否打開翻譯的參數
    > allow = 是, not-allow = 否, default = 看預設值

#### .env
存放專案打包路徑設定。

---

### <a name='LocalDevelopment'></a>Local Development
因為 im-library 是打包後被平台透過 npm 安裝下來的，
在本地若需測試兩個專案一起的話，
是透過 **vite watch mode** 的方式將專案打包至本地 `universe-portal-wap` 底下的 `node_modules/im-library`，是透過 `.env` 設定來控制打包路徑。

操作方式：

1. 將專案底下 apps/library/.env.development 複製一份並取名 .env
```bash
cp ./apps/library/.env.development ./apps/library/.env
```

2. 修改 .env 檔案內的 `PLATFORM_OUT_DIR` 參數成自己電腦裡 `universe-portal-wap` 的 `node_modules/im-library` 路徑
```properties
PLATFORM_OUT_DIR="{YOUR_PROJECT_BASE_PATH}/node_modules/im-library"
```

3. 在 apps/library/ 底下執行指令以 `watch mode` 形式打包到 `universe-portal-wap` 下
```bash
cd apps/library

pnpm run build:library-watch
```

4. 啟動平台專案

5. 只要 im-library 中有檔案異動，都會重新打包一次放到平台底下

---

### <a name='MockDataServer'></a>Mock Data Server

mock server 有分為兩種，http request & websocket。
是用 `nodejs` 原生提供的 `http` 模組去啟動一個 local server，
host 在 http://localhost:5174 domain 底下。

在設置 localStorage `mock` 為 `true` 時會將專案內的 `api 請求` 與 `ws 連線` 都轉為連到這個 domain。

而假資料是透過 [mockjs](https://github.com/nuysoft/Mock/wiki) 這個 package 去產生的。可以參考：
`apps/mockServer/src/mock/im/*`。

#### http request

在串接一個新的 api 時，可以在 `apps/mockServer/src/mock/im/` 新增自己的 mock api 資料。

資料型別宣告： `apps/mockServer/src/types.ts`

通常會將 `packages/api/im/types` 內定義的 api 資料型別拿來在 mock data 定義，要做[型別斷言](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)。

細節：`apps/mockServer/src/index.ts`

#### websocket connection



細節：`apps/mockServer/src/protobuf/im/index.ts`

---

### <a name='Embedded_In_Platform'></a>Embedded In Platform

專案會以 `npm package` 的形式給平台引入，
會將需要的模組打包並推至 gitlab 的 `im-library` repo，
然後 `universe-portal-wap/` 專案透過 npm 安裝下來使用。

目前有導出的模組：

```javascript
// apps/library/vite.config.ts

entry: {
  index:  // 主入口模塊
  app:  // 廣場入口
  anchors:  // 主播元件
  streaming:  // 主播直播元件
  chatroom: // 聊天室元件
  expert: // 專家元件
  store: // 全局狀態管理
}
```

`universe-portal-wap/` 引入方式：

```javascript
// src/sports/containers/DetailMarket/Im/Chatroom.tsx

//@ts-ignore
import Chatroom, { setChatInfo } from 'im-library/chatroom'
import SvelteAdapter from '@/components/SvelteAdapter'

// ...

// react component
const Chatroom = () => {
  // ...

  return (
    <SvelteAdapter comp={Chatroom} className={className} />
  )
}
```

因為要在 react 內嵌入 svelte 組件，會用 `SvelteAdapter` 這個組件包裹 im 導出的 svelte component，而內部是透過 `new comp({ target: node })` 的方式將組件掛載到指定的 html 元素上。

至於兩個專案的狀態共享與溝通有幾種方式：

1. localStorage

像是專案中的兩個專案的語系是透過 `localStorage` 去同步。
平台使用的是 `locale.current`，而 im 會在初始化的時候去 `localStorage` 看這個 key 後同步自己內部的 locale store。

2. callback registration

svelte 有提供一個 context module 的方式將組件的狀態可由外部透過 script 或是 ESM 引入。
這個狀態是全局而非屬於某個組件實例的，可能導致的問題見 [Issue](#Issues)

通常會是註冊某個組件的特定事件發生時要執行的 callback。

svelte 組件：
```javascript
<script lang="ts" context="module">
  // ...
  let onReadyCallback: () => void = () => {}
  // ...
  export const onReady = (callback: typeof onReadyCallback) => {
    // ...
    onReadyCallback = callback
  }
  // ...
</script>
```

平台使用：
```javascript
// @ts-ignore 
import { onReady } from 'im-library/streaming';

// ...

export const usePlayer = ({ loadingCallback, errorCallback }: Props) => {
  // ...
  onReady(() => {
    // do something
  });
  // ...
}
```

3. setter registration
同上，一樣是透過 context module 的方式，搭配 svelte/store 去將 store setter 暴露給平台去使用。


svelte 組件：
```javascript
<script lang="ts" context="module">
  // ...
  import * as anchor from '../store'
  // ...
  export const setStreaming = anchor.streaming.set
  // ...
</script>
```

平台使用：
```javascript
// @ts-ignore 
import { setStreaming } from 'im-library/streaming';

// ...

export const usePlayer = ({ loadingCallback, errorCallback }: Props) => {
  // ...
  
  useEffect(() => {
    // ...
    timeId = setTimeout(() => setStreaming(), 1000);
  }, []);
  // ...
}
```

4. event handler registration

暴露一個 event handler 註冊的 function 在平台引入並執行，來管理與更新 svelte 組件內的狀態。

svelte 組件：
```javascript
import { throttle } from 'utils'

let handleResize = null

export const regWindowSizeListener = (callbacks?: Array<(e?: Event) => any>) => {
  if (!window) return

  window.removeEventListener('resize', handleResize)

  handleResize = throttle((e: Event) => {
    // do something
  }, 250)
  
  window.addEventListener('resize', handleResize)
  return () => {
    window.removeEventListener('resize', handleResize)
  }
}
```

平台使用：
```javascript
import setImStore from 'im-library/store';
// ...

const useIMstore = () => {
  // ...

  const unRegListener = setImStore.regWindowSizeListener();

  return () => {
    unRegListener && unRegListener();
  };
}
```

> Note: 
> 加上 //@ts-ignore 的原因是現在還沒有找到可以產出模組 .d.ts 宣告檔的方法，
> svelte 官方提供的套件包 svelte-package 是針對某個根路徑去產生底下所有的 .d.ts，
> 但是 im 專案只有導出特定模組，就算針對根目錄為 `platform/` 去跑指令，
> 底下的模組又會引用其他非 `platform/` 底下的模組，產生出來的 .d.ts 路徑也會有問題。
>
> 暫時沒有找到其他解法，所以才先使用最暴力的 //@ts-ignore
> 能想到的 workaround：
> 1. 跑完 svelte-package 後透過 shell 腳本去解決路徑問題並放到 release/ 底下。
> 2. 手動定義 .d.ts 宣告

---

### <a name='I18n'></a>I18n

與其他 FE 專案一樣，會將 i18n 的 mapping 表放在 [i18n 服務](http://locale.fd.innotech.me/#/im-monorepo) 上，專案會在啟動 dev 跟 build 的時候去執行 nodejs 腳本將語系檔下載下來放至專案內一起打包。

在執行 `locales.mjs` 腳本時會將 key 中第一個點前面相同的 `category` 抓出來放在一個 json 檔案裡，再根據語系去產出 json 檔，然後產出一個 `fetcher.ts` 檔案做 `dynamic lazy import`。

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
---

### <a name='Theme'></a>Theme

實現方式：

在專案啟動的時候根據 `env-config` 中的業主代號去抓該業主的主題色 mapping。

目前只有分`谷歌`及`瑞銀`兩主題色，其他業主都會是這兩個其中之一。

``` javascript
// packages/utils/vdThemeGenerator/map.ts

vd001: theme.ruiYin,
vd002: theme.guGe,
vd003: theme.guGe,
vd004: theme.ruiYin,
// vd005: theme.guGe,
vd006: theme.guGe,
vd007: theme.ruiYin,
vd008: theme.guGe,
vd009: theme.ruiYin

ruiYin: {
  primary: '76 158 234', // #4C9EEA
  secondary: '80 189 255' // #50BDFF
},
guGe: {
  primary: '12 24 108', // #0C186C
  secondary: '80 84 255' // #5054FF
}
```

取到對應的主題色 mapping 表後，會透過 js 將 `mapping 表` 轉換成 `css 變數表` 並以 `<style></style>` 包裹後插入至 `<head></head>` 中

```html
<style>:root {--im-monorepo-primary:76 158 234;
--im-monorepo-secondary:80 189 255;
}</style>
```

因為專案也有使用 `tailwind-css`，所以也會定義 `tailwind color extend`。
細節： `packages/tailwind-config/tailwind.present.cjs`
```javascript
colors: {
  imprimary: {
    DEFAULT: 'rgb(var(--im-monorepo-primary))'
  },
  imsecondary: {
    DEFAULT: 'rgba(var(--im-monorepo-secondary))'
  }
}
```
---

### <a name='Api'></a>Api

專案是使用 [fetch api](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch) 做 http request 請求，多封裝了一層方便使用與型別判斷。

細節： `packages/api/base.ts`

加入新的 api 及 mock api 方式：

1. 到 `packages/api/im/index.ts` 加上新的 api method 至 api class
```javascript
webAnchors = this.apiGenerator<Types.IWebAnchors>({ url: `${prefix}/v1/anchor/web-anchors` })
```
2. 到 `packages/api/im/types/anchor.ts` 定義該 api 方法的型別
```javascript
export interface IWebAnchors {
  query: { // api querystring
    sid?: number
    keyWord?: string
    pageIdx: number
    pageSize: number
    lang?: string
    anchorType?: 1 | 2 // 1:賽事主播 2:充提主播
  }
  body: null // api body
  res: withData<{ // api response
    list: IWebAnchor[]
    pager: IPager
  }>
}

// packages/api/im/types/common.ts
export interface withData<T> { // 與後端定義的統一 api 格式型別
  message: string
  code: number
  data: T
  serverTime: number
}
```

3. 到 `apps/mockServer/src/mock/im/*.ts` 定義 mock api response 資料
```javascript
{
  url: `${prefix}/v1/anchor/web-anchors`, // 網址，與實際 api 一致
  timeout: 500, // 模擬 api 延遲使用的秒數設定
  // mock response
  response: ({ query }) => mock(withData<Types.IWebAnchors>({
    list,
    pager
  }))
},
```
---

### <a name='Device'></a>Device

im 專案也有做 `rwd` 的設計，而實作方式基本上與 `universe-portal-wap` 的機制相同。

- md: 375px (手機)
- lg: 600px (平板)
- xl: 1024px (電腦)

1. 會在專案啟動時透過 `vite.config` 將裝置尺寸設定從 `tailwind.config` 讀取進來
2. 將設定透過 `vite.config` 的 `define` 功能定義至 `process.env.SCREENS` 變數
3. 會註冊一個全域的 `resize` 事件監聽當前畫面尺寸，再跟上述設定值做比對分辨現在屬於哪一種裝置。

兩種根據尺寸做調整`樣式/功能`的方法：

1. [tailwind responsive design](https://tailwindcss.com/docs/responsive-design)
2. 全局 svelte/store， `isMd`, `isLg`, `isXl` 及 `deviceSize`

```javascript

// tailwind
<div class='color-red lg:color-blue xl:color-green'></div>

// svelte(js) 
{#if $isXl}
  <div>我是電腦版看到的</div>
{:else if $isLg}
  <div>我是平板看到的</div>
{:else}
  <div>我是手機版看到的</div>
{/if}
```
---

### <a name='Issues'></a>Issues

