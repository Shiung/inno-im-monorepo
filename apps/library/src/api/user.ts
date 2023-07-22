import { im } from 'api'
import { get } from 'svelte/store'
import { userKeyInfo, userAuth } from '$stores/user'
import { diffTime } from '$stores/common'

export const fetchUserKeyInfo = async () => {
  const res = await im.userKeyInfo({ query: { account: get(userAuth).userAccount }, })
  userKeyInfo.set(res.data)
  diffTime.set(res.serverTime - Date.now())
}