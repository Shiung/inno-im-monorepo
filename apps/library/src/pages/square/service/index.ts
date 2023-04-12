import { im } from 'api'

import type { IWebAnchors } from 'api/im/types'
import type { Request } from 'api/types'

export const fetchArchors = async (options?: Request): Promise<IWebAnchors> => {
  const res = await im.webAnchors(options)
  return res?.data
}
