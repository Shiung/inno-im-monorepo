export enum EErrorCode {
  // from send message
  TOO_OFTEN = 4005,
  MESSAGE_TOO_LONG = 4006,
  // from chat setting
  VIP_LIMIT = 4007,
  CURRENCY_LIMIT = 4008
}

export const errorCodeMsgMap = {
  4005: 'chat.tooOften',
  4006: 'chat.sendValidation.tooLong',
  4007: 'chat.sendValidation.vip',
  4008: 'chat.sendValidation.currency'
} as const

export enum EChatroomSize {
  DEFAULT = 'default',
  NORMAL = 'normal',
  EXPAND = 'expand',
  FULLSCREEN = 'fullscreen'
}