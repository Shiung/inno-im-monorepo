import { im } from 'api'

import type { ILanguages } from 'env-config'
import type { IWebAnchorMatches } from 'api/im/types'

const needRefatchTime = 10 * 1000
const matchDict: IMatchDict = new Map()

interface IMatch {
  lastUpdated: number
  data: IWebAnchorMatches['res']['data']
}

type IMatchDict = Map<string, IMatch>

const fetchAnchorMatchList = async (houseId: string, lang: ILanguages) => {
  const res = await im.webAnchorMatchList({ query: { houseId }, headers: { 'Accept-Language': lang }})
  matchDict.set(houseId, {
    lastUpdated: Date.now(),
    data: res.data
  })

  return matchDict.get(houseId).data
}


export const getMatches = async (houseId: string, lang: ILanguages) => {
  const match = matchDict.get(houseId)

  if (!match) return fetchAnchorMatchList(houseId, lang)

  const now = Date.now()
  
  if (match.lastUpdated + needRefatchTime <= now) return fetchAnchorMatchList(houseId, lang)
  else return match.data
}
