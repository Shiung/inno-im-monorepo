export type Listener = (arg0: IWsMasterEvent) => void

export interface SocketRef {
  current: WebSocket | null
}

export interface WatchDogProps {
  socket: SocketRef
  pingInterval?: WsMasterProps['pingInterval']
  reconnectTimeout?: WsMasterProps['reconnectTimeout']
  pingPongCommand?: WsMasterProps['pingPongCommand']
  listeners?: Listener[]
}

export interface IWsMasterEvent {
  eventkey: string | number,
  pairId?: string | number,
  data: any,
}

export interface WsMasterProps {
  url: string
  messageHandler?: (arg0: IWsMasterEvent, e: MessageEvent<any>) => void
  eventkeyParser?: (event: MessageEvent<any>) => IWsMasterEvent
  binaryType?: 'blob' | 'arraybuffer'
  pingInterval?: number
  reconnectTimeout?: number

  pingPongCommand?: {
    ping: string
    pong: string
  }

  reconnectInterval?: number
  activate?: boolean
  stopIfRetryOverTimes?: number
}

export interface SyncOptions {
  timeout?: number
}
