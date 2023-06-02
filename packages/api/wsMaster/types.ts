export type Listener = (arg0: any) => void

export interface SocketRef {
  current: WebSocket | null
}

export interface WatchDogProps {
  socket: SocketRef
  pingInterval?: number
  reconnectTimeout?: number
  pingCommand?: string
  listeners?: Listener[]
}

export interface WsMasterProps {
  url: string
  messageHandler: (arg0: { eventkey: string, data: any }, e: MessageEvent<any>) => void
  eventkeyParser?: (event: MessageEvent<any>) => { eventkey: string, data: any }
  binaryType?: 'blob' | 'arraybuffer'
  pingInterval?: number
  reconnectTimeout?: number
  pingCommand?: string
  reconnectInterval?: number
  activate?: boolean
  stopIfRetryOverTimes?: number
}

export interface SyncOptions {
  timeout?: number
}
