import { writable } from 'svelte/store'

export const headerRect = writable<DOMRect>(null)

export const loadMoreRect = writable<DOMRect>(null)

export const inputRect = writable<DOMRect>(null)

export const inputAreaOffset = writable<number>(0)

export const showBetList = writable<boolean>(false)