import { readable } from 'svelte/store'

export const mock = readable<boolean>(localStorage.getItem('mock') === 'true')
export const dev = readable<boolean>(localStorage.getItem('dev') === 'true')
