export type ENV = 'dev' | 'stg' | 'uat' | 'prod'

export interface WindowEnv {
  ODDS_BOARD_API_URL: string
  ODDS_BOARD_WEBSOCKET_URL: string
  BE_CDN_URL: string
  DEPLOY_ENV: string
  RESOURCE_URL: string
  ECHO_URL: string
}
