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
// export type MessageHandler = <K>(arg0: {eventKey: K, data: any}) => void

export interface WsMasterProps {
  url: string
  // messageHandler: MessageHandler
  messageHandler: Function
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
