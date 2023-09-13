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

細節：[apps/mockServer/src/mock/im/index.ts](/apps/mockServer/src/mock/im/index.ts)。

#### http request

在串接一個新的 api 時，可以在 `apps/mockServer/src/mock/im/` 新增自己的 mock api 資料。

資料型別宣告： [apps/mockServer/src/types.ts](/apps/mockServer/src/types.ts)

通常會將 `packages/api/im/types` 內定義的 api 資料型別拿來在 mock data 定義，要做[型別斷言](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)。

細節：[apps/mockServer/src/index.ts](/apps/mockServer/src/index.ts)

#### websocket

![protobuf-flow](/packages/protobuf/images/protobuf-flow.png)

因為 im websocket 是透過 `protobuf` 資料格式協定做溝通，所以在產生 mock api 時也要做編譯解譯的動作。

##### on connection

在初次連線成功時，mock server 會發送`聊天室設定`以及設一個定時器定時發送`假訊息`。

```javascript
export const onConnection = (ws: WebSocket) => {
  // ...

  const chatSettingBuffer = pushChatSetting()
  if(chatSettingBuffer) ws.send(chatSettingBuffer)

  sendInterval = setInterval(() => {
    const buffer = pushMessage()

    if (buffer) ws.send(buffer)
  }, 1000)
}
```

##### on message

會根據每一個 command 去做對應的事情：

```javascript
switch (data.command) {
  case impb.enum.command.PING: return onReceivePing(ws)
  case impb.enum.command.SEND_MESSAGE: return onReceiveSendMessage(ws, data)
  case impb.enum.command.SUBSCRIBE_CHAT: return onSubscribeChat(ws, data)
  case impb.enum.command.UNSUBSCRIBE_CHAT: return onUnsubscribeChat(ws, data)
  case impb.enum.command.FETCH_MESSAGES: return onReceiveFetchMessage(ws, data)
  case impb.enum.command.FETCH_OTHER_ORDERS: return onReceiveFetchOtherOrders(ws, data)
  case impb.enum.command.FETCH_CHAT_SETTING: return onReceiveFetchChatSetting(ws, data)
}
```

細節：[apps/mockServer/src/protobuf/im/index.ts](/apps/mockServer/src/protobuf/im/index.ts)

##### on close

停掉本來一直在跑`發送假訊息`的定時器。

##### 新增一個 mock command request

protobuf 可以參考 [protobuf package README](/packages/protobuf/README.md)
以 fetch message 為例：

1. client 端的 protobuf type `Request` 資料 decode

```javascript
const onReceiveFetchMessage = (ws: WebSocket, __data: IRequest) => {
  const fetchArgs = impb.fetchArgs.decode(__data.data.value) // decode

  // ...
}
```

2. 產生 protobuf type `PushMessageEntityWrapper` 資料 encode

```javascript

export const messageEntityData = (ts: number = Date.now(), props?: MessageEntityDataProps) => {
  // ...

  return mock({
    // ...
  })
}

export const pushMessageEntityWrapperEncode = (data: IPushMessageEntity[]) => {
  return impb.pushMessageEntityWrapper?.encode({ pushMessageEntity: data }) // encode
}

export const fetchMessages = (msg?: MessageEntityDataProps) => {
  const data = Array.from({ length: 100 }, (_, idx) => ({
    ...mockMessageEntity(msg, lastDateId - (100 - idx))
  }))

  lastDateId = data[0].msgId

  return pushMessageEntityWrapperEncode(data)
}
```

3. 產生 protobuf type `Push` encoded 資料並送出

```javascript
export const pushEncode = (props: PickPartial<IPush, 'command'>) => {
  const reqId = props.reqId || ''
  const code = props.code || 0
  const msg = props.msg || ''
  const data = props.data || { value: new Uint8Array() }

  return impb.push?.encode({ // encode
    reqId,
    command: props.command,
    code,
    msg,
    data
  })
}

const onReceiveFetchMessage = (ws: WebSocket, __data: IRequest) => {
  // ...

  const buf = pushEncode({
    reqId: __data?.reqId,
    command: impb.enum.command.FETCH_MESSAGES,
    data: { value: _data } })
  if (buf) {
    setTimeout(() => {
      ws.send(buf)
    }, 500)
  }
}
```