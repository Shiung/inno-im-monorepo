import { im } from 'api'

import type { Request } from 'api/types'

export const fetchAnchors = async (options?: Request) => {
  const res = await im.webAnchors(options)
  return res?.data
}

export const fetchAnchorMatches = async (options?: Request) => {
  const res = await im.webAnchorsMatchList(options)
  return res?.data
}
