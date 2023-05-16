import type { EventStatus } from './constants'

export interface IEvent {
  sid: number
  iid: number
  tid: number
  status: EventStatus
}

export interface IStompHeaders {
  'content-length': string
  'content-type': string
  'destination': string
  'message-id': string
  'subscription': string
  'timestamp'?: string
}


export type IStompCallback = (data: any, arg1: { headers: IStompHeaders }) => void
