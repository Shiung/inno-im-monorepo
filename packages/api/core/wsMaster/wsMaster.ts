import WatchDog from './watchdog'
import type { WatchDogProps, WsMasterProps, SyncOptions, IWsMasterEvent, WsMessage } from './types'
import wsObservables from './wsObservables'

type PromiseResolver = { resolve: (value: any) => void; timer: ReturnType<typeof setTimeout> }

class WsMaster {
  registrations: Array<() => void> = []
  // listener 是用來做 sync 用，會根據eventkey 以及 pairId 來決定是否為 等待的回應
  listeners: { [eventkey: string]: PromiseResolver[] }
  defaultSyncTimeout: number
  enabled: boolean
  retryTimes: number

  url: WsMasterProps['url']
  params?: { [key: string]: string | number }
  subprotocols: WsMasterProps['subprotocols']
  socket: WatchDogProps['socket']
  reconnectInterval: WsMasterProps['reconnectInterval']
  messageHandler: WsMasterProps['messageHandler']

  watchdog: WatchDog

  pingPongParser: WsMasterProps['pingPongParser']
  messagePreparser: WsMasterProps['messagePreparser']
  binaryType: WsMasterProps['binaryType']
  stopIfRetryOverTimes?: number
  publishPreprocessor?: WsMasterProps['publishPreprocessor']

  timer?: ReturnType<typeof setTimeout>

  constructor(props: WsMasterProps) {
    this.listeners = {}
    this.defaultSyncTimeout = 30 * 1000
    this.enabled = false
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
    if (props.messagePreparser) this.messagePreparser = props.messagePreparser
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
  }

  setParams(params: { [key: string]: string | number }) {
    if (this.params === params) return
    this.params = params
  }

  setSubprotocols(subprotocols: WsMasterProps['subprotocols']) {
    if (this.subprotocols === subprotocols) return
    this.subprotocols = subprotocols
  }

  async activate() {
    if (this.socket.current?.readyState === WebSocket.CONNECTING) return
    if (this.socket.current?.readyState === WebSocket.OPEN) return
    if (this.socket.current?.readyState === WebSocket.CLOSING) await this.waitingSocketClosed()
    const url = new URL(this.url)
    const searchParams = new URLSearchParams(this.params as unknown as URLSearchParams)
    if (searchParams.size !== 0) url.search = searchParams.toString()

    this.socket.current = new WebSocket(url.href, this.subprotocols)
    if (this.binaryType) this.socket.current.binaryType = this.binaryType

    this.socket.current.onopen = () => {
      console.log('ws connected.')
      this.registrations.forEach(cb => cb())
      this.enabled = true
      this.retryTimes = 0
    }

    this.socket.current.onmessage = e => {
      this.watchdog.extend()

      let parsed: IWsMasterEvent = { eventkey: '', data: e }
      if (this.messagePreparser) parsed = this.messagePreparser(e)

      // check if is pong command returned
      if (this.pingPongParser?.pong(parsed)) return

      if (this.messageHandler) this.messageHandler(e, parsed)
      this.obserableNotify(parsed)
      this.notifyToListeners(parsed)
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
        if (this.socket.current?.readyState === WebSocket.CLOSED) resolve(true)
        else setTimeout(checkState, 10)
      }
      checkState()
    })
  }

  // 用 promise 等待確認ws是否已經連線
  async waitingSocketConnect() {
    return new Promise(resolve => {
      const checkState = () => {
        if (this.socket.current?.readyState === WebSocket.OPEN) resolve(true)
        else setTimeout(checkState, 10)
      }
      checkState()
    })
  }

  genSyncEventkey(event: Omit<IWsMasterEvent, 'data'>) {
    const _pairId = event.pairId ? `_${event.pairId}` : ''
    const key = `${event.eventkey}${_pairId}`
    return key
  }

  waitSync(event: IWsMasterEvent, options?: SyncOptions) {
    const key = this.genSyncEventkey(event)

    return new Promise<IWsMasterEvent>((resolve, reject) => {
      if (!this.listeners[key]) this.listeners[key] = []

      const timer = setTimeout(() => {
        reject(`waitSync timeout ${key}`)

        const listeners = this.listeners[key]
        const listener = listeners.find(promiseResolver => promiseResolver.resolve === resolve)
        if (listener) listeners.splice(listeners.indexOf(listener), 1)
      }, options?.timeout || this.defaultSyncTimeout)

      this.listeners[key].push({ resolve, timer })
    })
  }

  send(sendMsg: WsMessage, options?: SyncOptions) {
    return new Promise<void>(async (resolve, reject) => {

      const timer = setTimeout(() => {
        reject('send timeout.')
      }, options?.timeout || this.defaultSyncTimeout)

      await this.waitingSocketConnect()
      this.socket.current?.send(sendMsg)
      clearTimeout(timer)
      resolve()
    })
  }

  async sendSync(event: IWsMasterEvent, options?: SyncOptions) {
    await this.send(event.data, options)
    const res = await this.waitSync(event, options)
    return res
  }

  notifyToListeners(event: IWsMasterEvent) {
    const key = this.genSyncEventkey(event)
    if (!this.listeners[key]) return

    for (const listener of this.listeners[key]) {
      clearTimeout(listener.timer)
      listener.resolve(event)
    }
    delete this.listeners[key]
  }

  subscribe(event: Omit<IWsMasterEvent, 'data'>, callback: (agr0: IWsMasterEvent) => void) {
    const key = this.genSyncEventkey(event)
    const observable = wsObservables.get(key)
    return observable?.subscribe(callback)
  }

  async publish(event: IWsMasterEvent) {
    await this.waitingSocketConnect()

    if (this.publishPreprocessor) event.data = this.publishPreprocessor(event)
    return this.sendSync(event)
  }

  obserableNotify(event: IWsMasterEvent) {
    const key = this.genSyncEventkey(event)
    const observable = wsObservables.get(key)
    observable?.notify(event)
  }

  // 每次重連都會執行的function
  register(callback: () => void) {
    if (this.socket.current?.readyState === WebSocket.OPEN) callback()
    this.registrations.push(callback)
  }

}

export default WsMaster
