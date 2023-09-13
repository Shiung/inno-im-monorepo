### Embedded In Platform

#### 使用方式

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

#### 狀態管理/溝通

至於兩個專案的狀態共享與溝通有幾種方式：

1. *localStorage*

    兩個專案的語系是透過 `localStorage` 去同步。
    平台使用的是 `locale.current`，而 im 會在初始化的時候去 `localStorage` 看這個 key 後同步自己內部的 `locale store` 以及 `locale` localStorage。

2. *callback registration*

    svelte 有提供一個 [context module](https://svelte.dev/docs/svelte-components#script-context-module) 的方式將組件的狀態可由外部透過 script 或是 ESM 引入。
    這個狀態是`全局而非屬於某個組件實例`的，可能導致的問題見 [Issue](/README.md#Issues)

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

3. *setter registration*

    可能是透過 [context module](https://svelte.dev/docs/svelte-components#script-context-module) 的方式，或者 svelte/store 去將 store setter 暴露給平台去使用。


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

    ```javascript
    const setImStore = {
      locale: locale.set, // store setter
      // ...
    }
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

4. *event handler registration*

    暴露一個註冊 `event handler` 的 function 在平台引入並執行，來管理與更新 svelte 組件內的狀態。

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

#### API 權限

im 專案的有些 api 需要[綁定平台權限](https://innotech.atlassian.net/wiki/spaces/GDIM/pages/2551906630/-+API+expert)，因此在初始化的時候會去監聽使用者資訊，改變時去重設 api request 的 `header`。

細節： `apps/library/src/commonInit.ts`

---
