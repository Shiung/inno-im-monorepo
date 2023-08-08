import { push } from "svelte-spa-router";
import { writable } from "svelte/store";

const initGoHomeCallback: () => void = () => push('/')
const noop = () => void(0)

export const goHomeCallback = writable<() => void>(initGoHomeCallback)
export const goLoginCallback = writable<() => void>(noop)
export const goVipCenterCallback = writable<() => void>(noop)
export const goDepositCallback = writable<() => void>(noop)

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

export const setGoDeposit = (callback: () => void) => {
  if (typeof callback !== 'function') return console.warn('setGoDeposit parameter callback MUST be function')
  goDepositCallback.set(callback)
}

export type GoDetailCallback = (path: string) => void

export const goDetailCallback = writable<GoDetailCallback>(noop)

export const setGoDetail = (callback: GoDetailCallback) => {
  if (typeof callback !== 'function') return console.warn('setGoDetail parameter callback MUST be function')
  goDetailCallback.set(callback)
}