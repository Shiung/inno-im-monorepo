import { writable } from 'svelte/store'

export const chatCompHeight = writable<{
  header: number
  loadMore: number
  box: number
  input: number
}>({
  header: 0,
  loadMore: 0,
  box: 0,
  input: 0
})

export const inputAreaOffset = writable<number>(0)