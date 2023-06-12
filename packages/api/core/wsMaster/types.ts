export type Listener = (arg0: IWsMasterEvent) => void

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
  data: any,
}

export interface WsMasterProps {
  url: string
  binaryType?: 'blob' | 'arraybuffer'
  pingInterval?: number
  reconnectTimeout?: number

  pingPongParser?: {
    ping: () => string | ArrayBufferLike | Blob | ArrayBufferView | undefined
    pong: (arg0: IWsMasterEvent) => boolean
  }

  reconnectInterval?: number
  activate?: boolean
  stopIfRetryOverTimes?: number
  eventkeyParser?: (event: MessageEvent<any>) => IWsMasterEvent
  messageHandler?: (arg0: IWsMasterEvent, e: MessageEvent<any>) => void
  publishPreprocessor?: (arg0: IWsMasterEvent) => string | ArrayBufferLike | Blob | ArrayBufferView
}

export interface SyncOptions {
  timeout?: number
}
