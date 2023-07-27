import { im } from 'api'
import { get } from 'svelte/store'
import { userKeyInfo, userAuth, initUserKeyInfo, showErrorMsgModal } from '$stores'
import { CODE_STATUS_OK } from '$src/constant'

export const fetchUserKeyInfo = async (token: string) => {
  if (!token) return

  try {
    const res = await im.userKeyInfo({ query: { account: get(userAuth).userAccount }, })
    const { code, data } = res || {}

    if (code === CODE_STATUS_OK) userKeyInfo.set(data || initUserKeyInfo)
    else showErrorMsgModal.set(true)
  } catch (error) {
    console.error(error)
    userKeyInfo.set(initUserKeyInfo)
  }
}