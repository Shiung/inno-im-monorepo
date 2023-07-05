export const warningCodeMap = {
  4005: 'chat.tooOften',
  '30002': 'chat.forbiddenWords',
  '30005': 'chat.continuousNumbers'
} as const

export enum EChatroomSize {
  DEFAULT = 'default',
  NORMAL = 'normal',
  EXPAND = 'expand',
  FULLSCREEN = 'fullscreen'
}