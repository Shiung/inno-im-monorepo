import { SocketRef, WatchDogProps } from './types'

class WatchDog {
  readonly interval: number
  readonly reconnectTimeout: number

  timer: ReturnType<typeof setTimeout> | null
  socket: SocketRef

  count: number
  pingCommand: string
  listeners: Array<(event: string) => void>

  constructor(props: WatchDogProps) {
    this.timer = null
    this.interval = props.pingInterval || 3 * 1000
    this.reconnectTimeout = props.reconnectTimeout || 20 * 1000
    this.count = 0
    this.socket = props.socket
    this.pingCommand = props.pingCommand || 'ping'
    this.listeners = []
  }

  counting() {
    this.timer = setInterval(() => {
      this.checkTimeoutAndNotify()
      if (this.socket.current && this.socket.current.readyState === 1) {
        // TODO:
        // this.socket.current.send(this.pingCommand)
        this.socket.current.send('\x00')
        this.count = this.count + 1
      }
    }, this.interval)
  }

  start() {
    this.counting()
  }

  extend() {
    if (this.timer) clearInterval(this.timer)
    this.count = 0
    this.counting()
  }

  stop() {
    if (this.timer) clearInterval(this.timer)
    this.count = 0
  }

  checkTimeoutAndNotify() {
    if (this.interval * this.count >= this.reconnectTimeout) {
      for (const listener of this.listeners) listener('reconnect')
    }
  }

  subscribe(listener: (event: string) => void) {
    this.listeners.push(listener)
  }
}

export default WatchDog
