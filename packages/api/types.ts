type IMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

export interface IMockData {
  method?: IMethod 
  timeout?: number
  response?: () => any
}

export type IApiInit = {
  url: string
  method?: IMethod
  mock?: IMockData
}

export type IApi = (o?: RequestWrap) => Promise<any>

export type RequestWrap = {
  [k in keyof RequestInit]: k extends 'body' ? { [key: string]: any } : RequestInit[k]
} & {
  params?: { [key: string]: string }
}

