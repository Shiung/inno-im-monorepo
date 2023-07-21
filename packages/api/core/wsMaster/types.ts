export type Listener = (arg0: IWsMasterEvent) => void

export type WsMessage = string | ArrayBufferLike | Blob | ArrayBufferView

export interface SocketRef {
  current: WebSocket | null
}

export interface WatchDogProps {
  socket: SocketRef
  pingInterval?: WsMasterProps['pingInterval']
  reconnectTimeout?: WsMasterProps['reconnectTimeout']
  pingPongParser?: WsMasterProps['pingPongParser']
  listeners?: Listener[]
}

export interface IWsMasterEvent {
  eventkey: string | number,
  pairId?: string | number,
  code?: number,
  msg?: string,
  data?: any,
}

export interface WsMasterProps {
  url: string
  binaryType?: 'blob' | 'arraybuffer'
  subprotocols?: string | string[]
  pingInterval?: number
  reconnectTimeout?: number

  pingPongParser?: {
    ping: () => WsMessage | undefined
    pong: (arg0: IWsMasterEvent) => boolean
  }

  reconnectInterval?: number
  activate?: boolean
  stopIfRetryOverTimes?: number
  messagePreparser?: (event: MessageEvent<any>) => IWsMasterEvent
  messageHandler?: (e: MessageEvent<any>, event: IWsMasterEvent) => void
  publishPreprocessor?: (event: IWsMasterEvent) => WsMessage
}

export interface SyncOptions {
  timeout?: number
}
