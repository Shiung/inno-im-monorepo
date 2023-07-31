import { im } from 'api'
import { userKeyInfo, initUserKeyInfo } from '$stores'
import { CODE_STATUS_OK } from '$src/constant'

export const fetchUserKeyInfo = async (token: string) => {
  if (!token) return

  try {
    const res = await im.userKeyInfo()
    const { code, data } = res || {}

    if (code === CODE_STATUS_OK) userKeyInfo.set(data || initUserKeyInfo)
  } catch (error) {
    console.error(error)
    userKeyInfo.set(initUserKeyInfo)
  }
}