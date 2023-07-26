import { writable } from 'svelte/store'

type Options = {
  matchId: number
  matchTime: number
  vd: string
}
type GoDetailCallback = (options: Options) => void

const initGoDetailCallback: GoDetailCallback = () => {}
export const goDetailCallback = writable<GoDetailCallback>(initGoDetailCallback)

export const setGoDetail = (callback) => {
  if (typeof callback !== 'function') return console.warn('setGoDetail parameter callback MUST be function')
  goDetailCallback.set(callback)
}