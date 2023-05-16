import { RxStomp } from '@stomp/rx-stomp'

export const rxStomp = new RxStomp()

const config = {
  // brokerURL: get(mock) ? 'ws://localhost:5173/stomp' : `${getConfig().ODDS_BOARD_WEBSOCKET_URL}/console-websocket/ws`,
  brokerURL: 'ws://localhost:5174/stomp/IM_STOMP_URL',
  reconnectDelay: 200,
  debug: (msg: string) => {
    if (msg.match('Opening Web Socket...')) {
      console.log('stomp', { event: 'ws', msg: 'websocket connecting...' })

    } else if (msg.match('Connection closed')) {
      console.log('stomp', { event: 'ws', msg: 'websocket closed.' })
    }
  }
}

export const activate = () => {
  rxStomp.configure(config)
  rxStomp.activate()
}

