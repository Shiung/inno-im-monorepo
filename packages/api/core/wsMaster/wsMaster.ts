import WatchDog from './watchdog'
import type { WatchDogProps, WsMasterProps, SyncOptions, IWsMasterEvent, WsMessage } from './types'
import wsObservables from './wsObservables'

type PromiseResolver = { resolve: (value: any) => void; timer: ReturnType<typeof setTimeout> }

class WsMaster {
  listeners: { [eventkey: string]: PromiseResolver[] }
  defaultSyncTimeout: number
  enabled: boolean
  retryTimes: number

  url: WsMasterProps['url']
  subprotocols: WsMasterProps['subprotocols']
  socket: WatchDogProps['socket']
  reconnectInterval: WsMasterProps['reconnectInterval']
  messageHandler: WsMasterProps['messageHandler']

  watchdog: WatchDog

  pingPongParser: WsMasterProps['pingPongParser']
  eventkeyParser: WsMasterProps['eventkeyParser']
  binaryType: WsMasterProps['binaryType']
  stopIfRetryOverTimes?: number
  publishPreprocessor?: WsMasterProps['publishPreprocessor']

  timer?: ReturnType<typeof setTimeout>

  constructor(props: WsMasterProps) {
    this.listeners = {}
    this.defaultSyncTimeout = 30 * 1000
    this.enabled = true
    this.retryTimes = 0

    this.url = props.url
    this.subprotocols = props.subprotocols
    this.socket = { current: null }
    this.reconnectInterval = props.reconnectInterval || 3 * 1000
    this.messageHandler = props.messageHandler

    this.watchdog = new WatchDog({
      socket: this.socket,
      pingInterval: props.pingInterval,
      reconnectTimeout: props.reconnectTimeout,
      pingPongParser: props.pingPongParser
    })

    if (props.pingPongParser) this.pingPongParser = props.pingPongParser
    if (props.eventkeyParser) this.eventkeyParser = props.eventkeyParser
    if (props.binaryType) this.binaryType = props.binaryType
    if (props.stopIfRetryOverTimes) this.stopIfRetryOverTimes = props.stopIfRetryOverTimes
    if (props.publishPreprocessor) this.publishPreprocessor = props.publishPreprocessor

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


  clearRetryTimes() {
    this.retryTimes = 0
  }

  setUrl(url: string) {
    if (this.url === url) return
    this.url = url
    this.reconnect()
  }

  setSubprotocols(subprotocols: WsMasterProps['subprotocols']) {
    if (this.subprotocols === subprotocols) return
    this.subprotocols = subprotocols
    this.reconnect()
  }

  async activate() {
    this.enabled = true
    if (this.socket.current?.readyState === 0) return
    if (this.socket.current?.readyState === 1) return
    if (this.socket.current?.readyState === 2) await this.waitingSocketClosed()
    this.socket.current = new WebSocket(this.url, this.subprotocols)
    if (this.binaryType) this.socket.current.binaryType = this.binaryType

    this.socket.current.onopen = () => {
      console.log('ws connected.')
      this.retryTimes = 0
    }

    this.socket.current.onmessage = event => {
      this.watchdog.extend()


      let parsed: IWsMasterEvent = { eventkey: '', data: null }
      if (this.eventkeyParser) parsed = this.eventkeyParser(event)
      // check if is pong command returned
      if (this.pingPongParser?.pong(parsed)) return

      this.obserableNotify(parsed)
      this.notifyToListeners(parsed)
      if (this.messageHandler) this.messageHandler(parsed, event)
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

  // 將ws連線斷線以及將watchdog關閉
  deactivate() {
    this.enabled = false
    if (this.timer) clearTimeout(this.timer)
    this.watchdog.stop()
    if (this.socket.current) this.socket.current.close()
  }

  // 用 promise 等待確認ws是否已經關閉
  private async waitingSocketClosed() {
    return new Promise(resolve => {
      const checkState = () => {
        if (this.socket.current?.readyState === 3) resolve(true)
        else setTimeout(checkState, 500)
      }
      checkState()
    })
  }

  // 用 promise 等待確認ws是否已經連線
  async waitingSocketConnect() {
    return new Promise(resolve => {
      const checkState = () => {
        if (this.socket.current?.readyState === 1) resolve(true)
        else setTimeout(checkState, 500)
      }
      checkState()
    })
  }

  waitSync(eventkey: string | number, options?: SyncOptions) {
    return new Promise<IWsMasterEvent>((resolve, reject) => {
      if (!this.listeners[eventkey]) this.listeners[eventkey] = []

      const timer = setTimeout(() => {
        reject(`waitSync timeout ${eventkey}`)

        const listeners = this.listeners[eventkey]
        const listener = listeners.find(promiseResolver => promiseResolver.resolve === resolve)
        if (listener) listeners.splice(listeners.indexOf(listener), 1)
      }, options?.timeout || this.defaultSyncTimeout)

      this.listeners[eventkey].push({ resolve, timer })
    })
  }

  // 待確認功能設計方向
  send(sendMsg: WsMessage, options?: SyncOptions) {
    return new Promise<void>(async (resolve, reject) => {

      const timer = setTimeout(() => {
        reject()
      }, options?.timeout || this.defaultSyncTimeout)

      await this.waitingSocketConnect()
      this.socket.current?.send(sendMsg)
      clearTimeout(timer)
      resolve()
    })
  }

  // 待確認功能設計方向
  async sendSync(sendMsg: WsMessage, eventKey: string | number, options?: SyncOptions) {
    await this.send(sendMsg, options)
    const res = await this.waitSync(eventKey, options)
    return res
  }

  // 待確認功能設計方向
  notifyToListeners(event: IWsMasterEvent) {
    if (!this.listeners[event.eventkey]) return

    for (const listener of this.listeners[event.eventkey]) {
      clearTimeout(listener.timer)
      listener.resolve(event)
    }
    delete this.listeners[event.eventkey]
  }

  subscribe(eventkey: string | number, callback: (agr0: IWsMasterEvent) => void) {
    const observable = wsObservables.get(eventkey)
    return observable?.subscribe(callback)
  }

  // TODO: publish 用法需要再優雅些, 綁死的 options.eventkey 需要有更好的用法
  async publish(event: IWsMasterEvent, options?: any) {
    await this.waitingSocketConnect()

    let data: WsMessage = event.data
    if (this.publishPreprocessor) data = this.publishPreprocessor(event, options)
    return this.sendSync(data, options?.eventkey || event.eventkey)
  }

  obserableNotify(props: IWsMasterEvent) {
    const observable = wsObservables.get(props.eventkey)
    observable?.notify(props)
  }

}

export default WsMaster
