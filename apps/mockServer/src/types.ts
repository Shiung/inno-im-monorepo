import type { Request } from 'express'

export type IMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

export interface IMockData {
  url: string
  method?: IMethod
  timeout?: number
  response: (req: Request) => any
}
