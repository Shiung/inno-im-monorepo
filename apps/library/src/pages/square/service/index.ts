import { im } from 'api'

import type { IWebAnchors, IExpertPredictions } from 'api/im/types'
import type { Request } from 'api/types'

export const fetchAnchors = async (options?: Request): Promise<IWebAnchors> => {
  const res = await im.webAnchors(options)
  return res?.data
}

export const fetchExpertPredictions = async (options?: Request): Promise<IExpertPredictions> => {
  const res = await im.expertPredictions(options)
  return res?.data
}
