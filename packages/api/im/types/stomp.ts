import type { ILanguages } from 'env-config'

export interface IChatRoom {
  type: 'message'
  blackList: boolean
  source: string
  sourceInfo: {
    nickName: string
    vip: number
    avatar: number
    sportAccount: string
    accountType: number 
    enabledTitle: number
  },
  language: ILanguages
  data: {
    message: string
    reply: null | string
  }
}