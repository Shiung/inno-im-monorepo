export type IMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options'

export interface IMockData {
  url: string
  method?: IMethod
  timeout?: number
  response: (req: { query: {[key: string]: string}}) => any
}
