import type { ENV, WindowEnv } from './types'
export type { ENV, ILanguages } from './types'
export { languages } from './types'

const env = 'dev'

const getDevConfig = (env: ENV): WindowEnv => {
  return {
    ODDS_BOARD_API_URL: 'https://api-dev.kioga.site/product',
    ODDS_BOARD_WEBSOCKET_URL: 'wss://api-dev.kioga.site/product',
    BE_CDN_URL: 'https://be-source.dev.mppwr.com',
    VENDERID: 'vd004',
    DEPLOY_ENV: env,
    RESOURCE_URL: '',
    ECHO_URL: 'https://echo.zuplo.io',
    IM_API_URL: 'http://172.28.40.157:3000/im/v1'
  }
}

declare global {
  interface Window { _env_: WindowEnv }
}

let config: WindowEnv = getDevConfig(env)

const hasWindowEnv = typeof window !== "undefined" && !!window?._env_
if (hasWindowEnv) config = window._env_

export const getConfig = () => config
