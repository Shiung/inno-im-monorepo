import { im } from 'api'
import type { Request } from 'api/types'

export const fetchArchorList = async (options?: Request) => {
  const res = await im.webAnchors(options)
  console.log(res)
}
