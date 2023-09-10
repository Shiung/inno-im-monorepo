### Mock Server

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

---

mock server 分為兩種，http request & websocket。

是用 `nodejs` 原生提供的 `http` 模組去啟動一個 local server，

host 在 http://localhost:5174 domain 底下。

在設置 localStorage `mock` 為 `true` 時會將專案內的 `api 請求` 與 `ws 連線` 都轉為連到這個 domain。

而假資料是透過 [mockjs](https://github.com/nuysoft/Mock/wiki) 這個 package 去產生的。

可以參考：`apps/mockServer/src/mock/im/*`。

#### http request

在串接一個新的 api 時，可以在 `apps/mockServer/src/mock/im/` 新增自己的 mock api 資料。

資料型別宣告： `apps/mockServer/src/types.ts`

通常會將 `packages/api/im/types` 內定義的 api 資料型別拿來在 mock data 定義，要做[型別斷言](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)。

細節：`apps/mockServer/src/index.ts`

#### websocket connection

(TODO)

細節：`apps/mockServer/src/protobuf/im/index.ts`
