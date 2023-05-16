import type { IHeaders } from './types'


export const headersParse = (data: string[]) => {
  const divider = data.findIndex(i => i === '')
  const headers = data.slice(0, divider)

  let _headers: IHeaders = { id: '', destination: '' }
  headers.map((header) => {
    const [key, value] = header.split(':')  
    _headers[key] = value
  })

  return _headers
}

export const bodyParse = (data: string[]) => {
  const divider = data.findIndex(i => i === '')
  const body = data.slice(divider + 1)

  return body.join('')
}
