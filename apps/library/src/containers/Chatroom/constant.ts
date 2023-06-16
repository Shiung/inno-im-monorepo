export const warningCodeMap = {
  '30002': 'chat.forbiddenWords',
  '30003': 'chat.tooOften',
  '30005': 'chat.continuousNumbers'
} as const

export enum EChatroomSize {
  DEFAULT = 'default',
  NORMAL = 'normal',
  EXPAND = 'expand',
  FULLSCREEN = 'fullscreen'
}