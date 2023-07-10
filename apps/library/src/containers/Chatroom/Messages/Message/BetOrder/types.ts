export type { ILanguages } from 'env-config'

export enum ShowConf {
  show = 'show',
  follow = 'follow'
}

export enum ActiveConf {
  disable = 'disable',
  active = 'active'
}

export type ShowType = `${ShowConf}`

export type ActiveType = `${ActiveConf}`