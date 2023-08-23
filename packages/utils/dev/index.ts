//@ts-ignore
import { publicEncrypt, constants } from 'crypto-browserify'
// *****IMPORTANT*****
// 因為 vite 在起 dev 環境的時候沒有全局定義 global 變數為 window (webpack 會)
// 在引入下面這個套件的時候會因為找不到 global 而出問題
// 短解可以參考 apps/library/vite.config.ts
import { Buffer } from 'buffer'
import { getConfig } from 'env-config'


export interface IUser {
  account: string
  token: string
}

const getEnv = () => getConfig().DEPLOY_ENV || 'dev'
const getVdId = () => getConfig().vendor_id || 4

const encryptRSA = async ({ pubKey, password }: { pubKey: string; password: string }) => {
  const _pubKey = `-----BEGIN PUBLIC KEY-----${pubKey}-----END PUBLIC KEY-----`
  const encryped = publicEncrypt({ key: _pubKey, padding: constants.RSA_PKCS1_PADDING }, Buffer.from(password))
  return encryped.toString('base64')
}

const getMerchantSetting = async () => {
  const res = await fetch(`https://tiger-api.inno${getEnv()}.site/platform/user/merchantSetting`, {
    headers: {
      'Content-Type': 'application/json',
      referer: `https://en-vd00${getVdId()}-tiger-portal.inno${getEnv()}.site`,
      device: 'mobile',
      currency: 'CNY'
    }
  })

  const data = await res.json()
  return data.data
}


const login = async (account: string, password: string) => {
  const res = await fetch(`https://tiger-api.inno${getEnv()}.site/platform/user/token`, {
    headers: {
      'Content-Type': 'application/json',
      referer: `https://en-vd00${getVdId()}-tiger-portal.inno${getEnv()}.site`,
      appType: '2',
    },
    method: 'POST',
    body: JSON.stringify({
      account: account,
      password: password,
      device: 'mobile',
      nonce: ''
    })
  })
  const data = await res.json()
  if (data.code !== 0) {
    return {}
  }
  return data.data
}

export const localDevUserLogin = async (account: string, password: string) => {
  if (!account || !password) return {
    account: '',
    token: ''
  }

  const setting = await getMerchantSetting()
  const encypPwd = await encryptRSA({ pubKey: setting.publicKey, password })
  const userInfo  = await login(account, encypPwd)

  return {
    account: account || '',
    token: (userInfo.token as string) || ''
  }
}

export const isSetDevLogin = () => localStorage.getItem('dev_login') === 'true'