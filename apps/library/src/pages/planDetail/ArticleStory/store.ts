import { writable } from 'svelte/store'
import type { TimeInfo } from 'utils' 

export const time = writable<TimeInfo>(null)