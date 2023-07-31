import { readable, writable } from 'svelte/store'

export const mock = readable<boolean>(localStorage.getItem('mock') === 'true')
export const dev = readable<boolean>(localStorage.getItem('dev') === 'true')

export const diffTime = writable(0)