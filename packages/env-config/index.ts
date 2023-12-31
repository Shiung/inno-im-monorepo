import type { ENV, WindowEnv } from './types'
export type { ENV, ILanguages } from './types'
export { languages } from './types'
export { activedVenders } from './constants'

const env = 'dev'

const getDevConfig = (env: ENV): WindowEnv => {
  return {
    ODDS_BOARD_API_URL: 'https://api-dev.kioga.site/product',
    ODDS_BOARD_WEBSOCKET_URL: 'wss://api-dev.kioga.site/product',
    FE_CDN_URL: 'https://fe-source.dev.mppwr.com',
    BE_CDN_URL: 'https://be-source.dev.mppwr.com',
    VENDERID: 'vd001',
    vendor_id: 1,
    DEPLOY_ENV: env,
    RESOURCE_URL: '',
    ECHO_URL: 'https://echo.zuplo.io',
    PLATFORM_API_URL: `https://tiger-api.inno${env}.site/platform`,
    IM_API_URL: `https://tiger-api.inno${env}.site/im`,
    IM_WS_URL: `wss://tiger-api.inno${env}.site/im`
  }
}

declare global {
  interface Window { _env_: WindowEnv, _version_: any, _imLocalWsReferer_: any }
}

let config: WindowEnv = getDevConfig(env)

const hasWindowEnv = typeof window !== "undefined" && !!window?._env_
if (hasWindowEnv) config = window._env_

export const getConfig = () => config
