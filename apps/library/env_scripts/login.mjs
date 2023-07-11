import fetch from 'node-fetch'
import crypto from 'crypto'


const randomItem = (array) => {
  const idx = Math.floor(Math.random() * array.length)
  return array[idx]
}

const encrypt = async ({ pubKey, password }) => {

  var _pubKey = `-----BEGIN PUBLIC KEY-----\n${pubKey.match(/.{1,64}/g).join('\n')}\n-----END PUBLIC KEY-----`
  const encryped = crypto.publicEncrypt({ key: _pubKey, padding: crypto.constants.RSA_PKCS1_PADDING }, Buffer.from(password))
  return encryped.toString('base64')
}

const getMerchantSetting = async () => {
  const res = await fetch('https://tiger-api.innodev.site/platform/user/merchantSetting', {
    headers: {
      'Content-Type': 'application/json',
      referer: 'https://en-vd001-tiger-portal.innodev.site',
      device: 'mobile',
      currency: 'CNY'
    }
  })

  const data = await res.json()
  return data.data
}


const login = async (account, password) => {
  const res = await fetch('https://tiger-api.innodev.site/platform/user/token', {
    headers: {
      'Content-Type': 'application/json',
      referer: 'https://en-vd001-tiger-portal.innodev.site',
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
    console.log('=========================================login fail =======================================================')
    $`exit 1`
  }
  return data.data
}


const accounts = [
  'bltest02',
  'bltest03',
  'bltest04',
  'bltest05',
  'bltest06',
]

const setting = await getMerchantSetting()
const account = process.argv[3] || randomItem(accounts)
const password = await encrypt({ pubKey: setting.publicKey, password: process.argv[4] || '1q2w3e4r' })
const userInfo = await login(account, password)

await $`touch src/assets/user.ts`
await $`echo "export const token = '${userInfo.token}'" > src/assets/user.ts`
await $`echo "export const account = '${account}'" >> src/assets/user.ts`
await $`pnpm dev`
