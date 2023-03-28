export type IMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

export interface IMockData {
  url: string
  method?: IMethod
  timeout?: number
  response?: () => any
}
