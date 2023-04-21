import { im } from 'api'

import type { IWebAnchorMatches } from 'api/im/types'

const needRefatchTime = 10 * 1000
const matchDict: IMatchDict = new Map()

interface IMatch {
  lastUpdated: number
  data: IWebAnchorMatches
}

type IMatchDict = Map<string, IMatch>

const fetchAnchorMatchList = async (houseId: string) => {
  const res = await im.webAnchorMatchList({ query: { houseId }})
  matchDict.set(houseId, {
    lastUpdated: Date.now(),
    data: res.data
  })

  return matchDict.get(houseId).data
}


export const getMatches = async (houseId: string) => {
  const match = matchDict.get(houseId)

  if (!match) return fetchAnchorMatchList(houseId)

  const now = Date.now()
  
  if (match.lastUpdated + needRefatchTime <= now) return fetchAnchorMatchList(houseId)
  else return match.data
}
