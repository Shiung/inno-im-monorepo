import { get } from 'svelte/store'
import { im } from 'api'
import type { IWebAnchors, IWebAnchor } from 'api/im/types'
import type { ILanguages } from 'env-config'

import { locale } from '$stores'
import { SID } from '$src/constant'

export const fetchAnchorMatches = async (houseId: string, lang: ILanguages) => {
  const response = await im.webAnchorMatchList({ query: { houseId }, headers: { 'Accept-Language': lang } })

  const { matchList } = response?.data || {}
  if (matchList?.length > 0) {
    return matchList
  }

  return []
}

type IWebAnchorQueryWithLocale = IWebAnchors['query']

export const fetchAnchorsApi = async ({ sid, keyWord, lang, pageIdx, pageSize, anchorType }: IWebAnchorQueryWithLocale, options?: any) => {
  const defaultRes = { list: null, pager: null }
  try {
    const response = await im.webAnchors({
      query: {
        ...(sid && { sid }),
        ...(keyWord && { keyWord }),
        pageIdx,
        pageSize,
        ...(lang && { lang }),
        ...(anchorType && { anchorType })
      },
      headers: { 'Accept-Language': get(locale) },
    }, options)
  
    return response?.data || defaultRes
  } catch (error) {
    console.error(error)
    return defaultRes
  }
}

export const isDepositAnchor = (item: IWebAnchor) => item.sid === SID.deposit

export const filterAnchorList = (data: IWebAnchor[]) => {
  return data.filter((item) => isDepositAnchor(item) || item.matchList?.length > 0)
}
