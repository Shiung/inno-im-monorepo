import WatchDog from './watchdog'
import type { WatchDogProps, WsMasterProps, SyncOptions } from './types'
import wsObservables from './wsObservables'

type PromiseResolver = { resolve: (value: any) => void; timer: ReturnType<typeof setTimeout> }

class WsMaster {
  listeners: { [key: string]: PromiseResolver[] }
  defaultSyncTimeout: number
  enabled: boolean
  retryTimes: number

  url: WsMasterProps['url']
  socket: WatchDogProps['socket']
  reconnectInterval: WatchDogProps['reconnectTimeout']
  messageHandler: WsMasterProps['messageHandler']

  watchdog: WatchDog

  eventkeyParser: WsMasterProps['eventkeyParser']
  binaryType: WsMasterProps['binaryType']
  stopIfRetryOverTimes?: number

  timer?: ReturnType<typeof setTimeout>

  constructor(props: WsMasterProps) {
    this.listeners = {}
    this.defaultSyncTimeout = 30 * 1000
    this.enabled = true
    this.retryTimes = 0

    this.url = props.url
    this.socket = { current: null }
    this.reconnectInterval = props.reconnectInterval || 3 * 1000
    this.messageHandler = props.messageHandler

    this.watchdog = new WatchDog({
      socket: this.socket,
      pingInterval: props.pingInterval,
      reconnectTimeout: props.reconnectTimeout,
      pingCommand: props.pingCommand
    })

    if (props.eventkeyParser) this.eventkeyParser = props.eventkeyParser
    if (props.binaryType) this.binaryType = props.binaryType
    if (props.stopIfRetryOverTimes) this.stopIfRetryOverTimes = props.stopIfRetryOverTimes

    this.init()
    if (props.activate) this.activate()
  }

  private init() {
    this.watchdog.subscribe(this.eventHandler.bind(this))
  }

  private eventHandler(event: string) {
    switch (event) {
      case 'reconnect':
        return this.reconnect()
      default:
        break
    }
  }


  notifyToListeners(key: string, data: any) {
    if (this.listeners[key]) {
      for (const listener of this.listeners[key]) {
        clearTimeout(listener.timer)
        listener.resolve({ key, ...data })
      }
      this.listeners[key] = []
    }
  }

  obserableNotify(key: string, data: any) {
    const observable = wsObservables.create(key)
    observable?.notify({ key, ...data })
  }

  clearRetryTimes() {
    this.retryTimes = 0
  }

  setUrl(url: string) {
    if (this.url === url) return
    this.url = url
    this.reconnect()
  }

  async activate() {
    this.enabled = true
    if (this.socket.current?.readyState === 0) return
    if (this.socket.current?.readyState === 1) return
    if (this.socket.current?.readyState === 2) await this.waitingSocketClosed()
    this.socket.current = new WebSocket(this.url)
    if (this.binaryType) this.socket.current.binaryType = this.binaryType

    this.socket.current.onopen = () => {
      console.log('ws connected.')
      this.retryTimes = 0
    }

    this.socket.current.onmessage = event => {
      this.watchdog.extend()

      let parsed: { eventkey: string, data: any } = { eventkey: '', data: null }
      if (this.eventkeyParser) parsed = this.eventkeyParser(event)
      // if (eventKey === 'pong') return

      // this.obserableNotify(eventKey, data)
      // this.notifyToListeners(eventKey, data)
      this.messageHandler(parsed, event)
      // TODO
      // this.messageHandler({ eventKey, data })
    }

    this.socket.current.onclose = e => {
      console.log('ws closed: ', e)
      if (this.stopIfRetryOverTimes && this.retryTimes >= this.stopIfRetryOverTimes) this.deactivate()
      else if (this.enabled) this.reconnect()
      this.retryTimes = this.retryTimes + 1
    }
    this.socket.current.onerror = e => {
      console.log('ws error: ', e)
    }
    this.watchdog.start()
  }

  reconnect() {
    if (this.timer) clearTimeout(this.timer)
    this.watchdog.stop()
    if (this.socket.current) this.socket.current.close()

    this.timer = setTimeout(this.activate.bind(this), this.reconnectInterval)
  }

  deactivate() {
    this.enabled = false
    if (this.timer) clearTimeout(this.timer)
    this.watchdog.stop()
    if (this.socket.current) this.socket.current.close()
  }

  async waitingSocketClosed() {
    return new Promise(resolve => {
      const checkState = () => {
        if (this.socket.current?.readyState === 3) resolve(true)
        else setTimeout(checkState, 500)
      }
      checkState()
    })
  }

  async waitingSocketConnect() {
    return new Promise(resolve => {
      const checkState = () => {
        if (this.socket.current?.readyState === 1) resolve(true)
        else setTimeout(checkState, 500)
      }
      checkState()
    })
  }

  waitSync(eventKey: string, options?: SyncOptions) {
    return new Promise<{ key: string; data: any }>(resolve => {
      if (!this.listeners[eventKey]) this.listeners[eventKey] = []

      const timer = setTimeout(() => {
        resolve({ key: 'timeout', data: {} })

        const listeners = this.listeners[eventKey]
        const listener = listeners.find(promiseResolver => promiseResolver.resolve === resolve)
        if (listener) listeners.splice(listeners.indexOf(listener), 1)
      }, options?.timeout || this.defaultSyncTimeout)

      this.listeners[eventKey].push({ resolve, timer })
    })
  }

  send(sendMsg: string, options?: SyncOptions) {
    return new Promise<{ key: string; data: any }>(async resolve => {
      const timer = setTimeout(() => {
        resolve({ key: 'timeout', data: {} })
      }, options?.timeout || this.defaultSyncTimeout)

      await this.waitingSocketConnect()
      this.socket.current?.send(sendMsg)
      clearTimeout(timer)
      resolve({ key: 'success', data: {} })
    })
  }

  async sendSync(sendMsg: string, eventKey: string, options?: SyncOptions) {
    await this.send(sendMsg, options)
    const res = await this.waitSync(eventKey, options)
    return res
  }
}

export default WsMaster
