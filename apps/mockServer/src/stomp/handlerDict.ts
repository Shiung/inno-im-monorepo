import { subscribe as im_subscribe, send as im_send } from './im'

export const subscribe = new Map([
    ['IM_STOMP_URL', im_subscribe]
])

export const send = new Map([
    ['IM_STOMP_URL', im_send]
])
