import WatchDog from './watchdog'
import type { WatchDogProps, WsMasterProps, SyncOptions, IWsMasterEvent } from './types'
import wsObservables from './wsObservables'

type PromiseResolver = { resolve: (value: any) => void; timer: ReturnType<typeof setTimeout> }

class WsMaster {
  listeners: { [eventkey: string]: PromiseResolver[] }
  defaultSyncTimeout: number
  enabled: boolean
  retryTimes: number

  url: WsMasterProps['url']
  socket: WatchDogProps['socket']
  reconnectInterval: WatchDogProps['reconnectTimeout']
  messageHandler: WsMasterProps['messageHandler']

  watchdog: WatchDog

  pingPongCommand: WsMasterProps['pingPongCommand']
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
    this.socket = { current: null }
    this.reconnectInterval = props.reconnectInterval || 3 * 1000
    this.messageHandler = props.messageHandler

    this.watchdog = new WatchDog({
      socket: this.socket,
      pingInterval: props.pingInterval,
      reconnectTimeout: props.reconnectTimeout,
      pingPongCommand: props.pingPongCommand
    })

    if (props.pingPongCommand) this.pingPongCommand = props.pingPongCommand
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
      if (event.data === this.pingPongCommand?.pong) return

      let parsed: IWsMasterEvent = { eventkey: '', pairId: '', data: null }
      if (this.eventkeyParser) parsed = this.eventkeyParser(event)

      this.obserableNotify(parsed)
      // this.notifyToListeners(eventKey, data)
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
    if (this.pingPongCommand) this.watchdog.start()
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

  // 待修正
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

  // 待修正
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

  // 待修正
  async sendSync(sendMsg: string, eventKey: string, options?: SyncOptions) {
    await this.send(sendMsg, options)
    const res = await this.waitSync(eventKey, options)
    return res
  }

  // 待修正
  notifyToListeners(eventkey: string, data: any) {
    if (!this.listeners[eventkey]) return

    for (const listener of this.listeners[eventkey]) {
      clearTimeout(listener.timer)
      listener.resolve({ eventkey, ...data })
    }
    this.listeners[eventkey] = []
  }

  subscribe(eventkey: string | number, callback: (agr0: IWsMasterEvent) => void) {
    const observable = wsObservables.get(eventkey)
    return observable?.subscribe(callback)
  }

  async publish(event: IWsMasterEvent) {
    await this.waitingSocketConnect()

    let data: string | ArrayBufferLike | Blob | ArrayBufferView = event.data
    if (this.publishPreprocessor) data = this.publishPreprocessor(event)
    this.socket.current?.send(data)
  }

  obserableNotify(props: IWsMasterEvent) {
    const observable = wsObservables.get(props.eventkey)
    observable?.notify(props)
  }

}

export default WsMaster
