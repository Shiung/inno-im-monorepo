### protobuf

存放跨專案共用的 protobuf encoding/decoding 模組，又分為給 client/server 端的兩個入口。

[protobuf](https://protobuf.dev/) 是 google 開發的一種資料通訊格式，有別於傳統 XML、JSON，在資料面上更輕量、傳輸更快速且經過編碼，而且支援很多種語言的動態產生編譯程式碼。

專案使用的是 [protobufjs](https://github.com/protobufjs/protobuf.js)。

#### proto

protobuf 的核心在於會有一個由開發人員共同規範的 .proto file，各端都會以這個 proto 檔去做 protobuf 資料格式的編譯解譯。

這套規範的文件目前放在 im 後端的 [repo](https://gitlab.innotech.me/game/im/im-pb) 內做管理，而我們專案是使用 [git submodule](https://blog.kennycoder.io/2020/06/14/Git-submodule-%E4%BD%BF%E7%94%A8%E6%95%99%E5%AD%B8/) 的方式去做同步與版控。

---

#### .proto import

因為 .proto 檔非一般 js/ts 檔案，不能被 vite 解析，比較像是靜態資源引入的概念，所以在引入的時候會在路徑後面加上 [`?url`](https://vitejs.dev/guide/assets.html#explicit-url-imports) 來告訴 vite 這是一個外部資源。

```javascript
// index.ts
import pb from './im-pb/im-chat/im.proto?url'
```

---

#### folder structure

```bash
|-- im-pb/ # 存放 .proto 檔 (git submodule of im-pb)
|-- constants.ts # 一些常數定義
|-- impb.ts # 主要解析 protobuf 格式的 class
|-- index.ts # frontend impb entry
|-- node.ts # backend impb entry (mock server)
|-- types.ts # protobuf types declaration
```

---

#### 新增 protobuf 格式定義

之前的做法不是用 protobufjs 產生編譯解譯的 tool code，而是用提供的 API 去做。

##### message

以下以 `PushMessageEntity` 為例：


1. 確認 .proto 檔的格式有沒有加入

```protobuf
message PushMessageEntity {
  int64       msgId           = 1;
  ContentType contentType     = 2;
  int64       vdId            = 3;
  string      sender          = 4;
  string      senderName      = 5;
  bool        isSelf          = 6;
  string      chatId          = 7;
  int32       iid             = 8;
  int32       vip             = 9;
  string      avatar          = 10;
  int64       replyTo         = 11;
  string      content         = 12;
  Visible     visible         = 13;
  int64       timestamp       = 14;
  string      houseId         = 15;
  string      lang            = 16;
  map<string, string> translationList = 17;
}
```

2. 在 `impb.ts` 幾個地方加入解析這個格式的 code：

```javascript
import type { Type } from 'protobufjs' // 引入型別
import type { /* ... */, IRequestMessageEntity } from './types' // typescript 型別定義

class ImBp {
  // ...
  public _pushMessageEntity: ReturnType<Type['lookupType']> | null = null

  async init(protobuf: string) {
    const root = await load(protobuf)
    // ...
    this._pushMessageEntity = root.lookupType('PushMessageEntity') // 取得 .proto 定義的格式
  }

  // ...

  // 防止編碼/解碼錯誤的 wrapper function
  safeCode<T>(callback: () => T) {
    try { return callback() }
    catch (e) {
      console.warn(e)
      return {} as any
    }
  }
  get pushMessageEntity() {
    return {
      encode: (data: IPushMessageEntity) => this.safeCode(() => this._pushMessageEntity?.encode(data).finish()), // 定義編碼方法
      // 定義解碼方法
      // 後端傳來的資料格式都會是 ArrayBuffer/Uint8Array
      // 需要強制給它加上自定義型別，讓 client 端操作可以使用
      decode: (data: ArrayBuffer) => this.safeCode(() => this._pushMessageEntity?.decode(new Uint8Array(data)) as unknown as IPushMessageEntity)
    }
  }
}
```

3. 在 client 端使用：

```javascript
import impb from 'protobuf/im/node'

export const pushMessageEntity = (msg?: MessageEntityDataProps) => {
  // ...
  return impb.pushMessageEntity?.encode(data)
}
```

```javascript
import { im } from 'protobuf'

export const pushMessageParser = (decoded: IPush) => {
  const pushMessageEntity = im.pushMessageEntity.decode(decoded.data?.value)
  // ...
}
```

##### enum

以下以 `Command` 為例：

1. 確認 .proto 檔的格式有沒有加入

```protobuf
enum Command {
  COMMAND_NONE       = 0;
  SEND_MESSAGE       = 1;
  FETCH_MESSAGES     = 2;
  REPORT_ABUSE       = 3;
  SWITCH_LANGUAGE    = 4;
  SUBSCRIBE_CHAT     = 5;
  UNSUBSCRIBE_CHAT   = 6;
  PING               = 7;
  FETCH_OTHER_ORDERS = 8;
  FETCH_CHAT_SETTING = 9;
  PUSH_MESSAGE       = 100;
  CHAT_SETTING       = 101;
  USER_STATUS        = 200;
}
```
2. 在 `impb.ts` 幾個地方加入解析這個格式的 code：

```javascript
import type { Type } from 'protobufjs' // 引入型別
import { Enum } from './constants' // 引入自訂常數

class ImBp {
  // ...
  public enum = Enum

  async init(protobuf: string) {
    const root = await load(protobuf)
    // ...

    this.enum = {
      // ...
      command: root.getEnum('Command') as unknown as typeof Enum['command'],
    }
  }
}
```

3. 在 client 端使用：

```javascript
import { im as impb } from 'protobuf'

const subscribePushMessage = () => imWs.subscribe({ eventkey: impb.enum.command.PUSH_MESSAGE }, ({ data }) => {
  const store = getStore({ chatId: data.chatId, iid: data.iid })
  store.update((msg) => [...msg, data])
})
```

