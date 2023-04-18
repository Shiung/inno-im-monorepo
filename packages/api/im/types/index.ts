export * from './anchor'
export * from './expert'

export interface withData<T> {
  message: string
  code: string
  data: T
  serverTime: number
}
