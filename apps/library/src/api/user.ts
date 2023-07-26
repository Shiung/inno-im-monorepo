import { im } from 'api'
import { get } from 'svelte/store'
import { userKeyInfo, userAuth, initUserKeyInfo } from '$stores'

export const fetchUserKeyInfo = async (token: string) => {
  if (!token) return

  try {
    const res = await im.userKeyInfo({ query: { account: get(userAuth).userAccount }, })
    userKeyInfo.set(res?.data || initUserKeyInfo)
  } catch (error) {
    console.error(error)
    userKeyInfo.set(initUserKeyInfo)
  }
}