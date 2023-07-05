import { writable } from 'svelte/store'

export const bottomNav = writable<string>()
export const showBottomNav = writable<boolean>(true)
export const appHeight = writable<number>(0)