import WsMaster from './wsMaster'
import type { WsMasterProps } from './types'

const createWebsocket = (props: WsMasterProps): WsMaster => {
  const wsMaster = new WsMaster(props)
  return wsMaster
}

export type { SyncOptions, Listener } from './types'
export { default as wsObservables } from './wsObservables'
export default createWebsocket
