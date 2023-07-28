import { writable } from 'svelte/store'

export type GoDetailCallback = (path: string) => void

const initGoDetailCallback: GoDetailCallback = () => {}
export const goDetailCallback = writable<GoDetailCallback>(initGoDetailCallback)

export const setGoDetail = (callback: GoDetailCallback) => {
  if (typeof callback !== 'function') return console.warn('setGoDetail parameter callback MUST be function')
  goDetailCallback.set(callback)
}