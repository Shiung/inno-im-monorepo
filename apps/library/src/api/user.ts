import { im } from 'api'
import { userKeyInfo, userVipList } from '$stores/user'
import type { IRequestParams } from './types'

export const fetchUserVipList = async (params: IRequestParams) => {
  const { token, lang, pvd } = params
  const res = await im.userVipList({
    query: { pvd },
    headers: { 'Accept-Language': lang, 'Authorization': token }
  })
  userVipList.set(res.data)
}

export const fetchUserKeyInfo = async (params: IRequestParams) => {
  const { token, lang, account, pvd } = params
  const res = await im.userKeyInfo({
    query: { account, pvd },
    headers: { 'Accept-Language': lang, 'Authorization': token }
  })
  userKeyInfo.set(res.data)
}