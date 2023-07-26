import { writable } from 'svelte/store'

type GoDetailCallback = (matchId: number) => void

const initGoDetailCallback: GoDetailCallback = () => {}
export const goDetailCallback = writable<GoDetailCallback>(initGoDetailCallback)

export const setGoDetail = (callback) => {
  if (typeof callback !== 'function') return console.warn('setGoDetail parameter callback MUST be function')
  goDetailCallback.set(callback)
}