import { im } from 'api'
import type { ILanguages } from 'env-config'

export const fetchAnchorMatches = async (houseId: string, lang: ILanguages) => {
  const response = await im.webAnchorMatchList({ query: { houseId }, headers: { 'Accept-Language': lang } })

  const { matchList } = response?.data || {}
  if (matchList?.length > 0) {
    return matchList
  }

  return []
}