import { push } from "svelte-spa-router";
import { writable } from "svelte/store";

const initGoRoute: () => void = () => push('/')

export const goHomeCallback = writable<() => void>(initGoRoute)
export const goLoginCallback = writable<() => void>(initGoRoute)
export const goVipCenterCallback = writable<() => void>(initGoRoute)

export const setGoHome = (callback: () => void) => {
  if (typeof callback !== 'function') return console.warn('setGoHome parameter callback MUST be function')
  goHomeCallback.set(callback)
}

export const setGoLogin = (callback: () => void) => {
  if (typeof callback !== 'function') return console.warn('setGoLogin parameter callback MUST be function')
  goLoginCallback.set(callback)
}

export const setGoVipCenter = (callback: () => void) => {
  if (typeof callback !== 'function') return console.warn('setGoVipCenter parameter callback MUST be function')
  goVipCenterCallback.set(callback)
}

export type GoDetailCallback = (path: string) => void

const initGoDetailCallback: GoDetailCallback = () => {}
export const goDetailCallback = writable<GoDetailCallback>(initGoDetailCallback)

export const setGoDetail = (callback: GoDetailCallback) => {
  if (typeof callback !== 'function') return console.warn('setGoDetail parameter callback MUST be function')
  goDetailCallback.set(callback)
}