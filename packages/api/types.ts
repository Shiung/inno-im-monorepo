export type IApiInit = {
  url: string
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete',
}

export type IApi = (o?: RequestWrap) => Promise<any>

export type RequestWrap = {
  [k in keyof RequestInit]: k extends 'body' ? { [key: string]: any } : RequestInit[k]
} & {
  params?: { [key: string]: string }
}
