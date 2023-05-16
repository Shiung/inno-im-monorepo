export type IHeaders = {
  [key: string]: string
} & { id: string, destination: string }

export interface IStompData {
  headers: IHeaders
  body: string
}

