import WsMaster from './wsMaster'
import type { WsMasterProps } from './types'

export const createWebsocket = (props: WsMasterProps): WsMaster => new WsMaster(props)

export type { SyncOptions, Listener } from './types'
export { default as wsObservables } from './wsObservables'
export default createWebsocket
