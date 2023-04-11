export const languages = [
  'zh_CN',
  'en_US',
  'ms_MY',
  'id_ID',
  'vi_VN',
  'zh_HK',
  'ja_JP',
  'ko_KR',
  'th_TH',
  'hi_IN',
  'pt_PT'
] as const

export type ILanguages = typeof languages[number]

export type ENV = 'dev' | 'stg' | 'uat' | 'prod'

export interface WindowEnv {
  ODDS_BOARD_API_URL: string
  ODDS_BOARD_WEBSOCKET_URL: string
  BE_CDN_URL: string
  DEPLOY_ENV: string
  RESOURCE_URL: string
  ECHO_URL: string
  IM_BE_URL: string
}
