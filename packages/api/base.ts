import { getConfig } from 'env-config'
import type { WindowEnv } from 'env-config/types'

import type { IApiInit, Request, ApiType } from './types'

const mock = localStorage.getItem('mock') === 'true' || false
const MOCK_SERVER = `http://${window.location.hostname}:5174`

export default class Base {
  private baseUrl: string | number
  private apiPrefix: string


  constructor({ API_KEY, API_PREFIX }: { API_KEY: keyof WindowEnv, API_PREFIX?: string }) {
    this.baseUrl = ''
    this.apiPrefix = API_PREFIX || ''

    try {
      if (mock) {
        this.baseUrl = `${MOCK_SERVER}/${API_KEY}`
        return
      }

      const baseUrl = getConfig()[API_KEY]
      if (!baseUrl) throw ('[missing a certain API_KEY]')

      this.baseUrl = baseUrl

    } catch (e) {
      console.error(e, `missing ${API_KEY} at window._env_`)
    }
  }

  private genParams<TQuery>(params?: TQuery) {
    if (!params) return ''
    const urlParams = new URLSearchParams(params as unknown as URLSearchParams).toString()
    return `?${urlParams}`
  }

  protected apiGenerator<T extends ApiType<T['res']>>({ url, method }: IApiInit): (req?: Request<T['query'], T['body']>) => Promise<T['res']> {

    return async (request?: Request<T['query'], T['body']>) => {
      const _method = request?.method || method || 'get'
      const _request = { ...request, body: null }

      const getBody = () => {
        if (_method === 'get') return null
        return request?.body
      }

      const _url = `${this.baseUrl}${this.apiPrefix}${url}${this.genParams(request?.query)}`

      const res = await fetch(_url, {
        ..._request,
        method: _method,
        headers: {
          'Content-type': 'application/json',
          ...request?.headers
        },
        ...(getBody() && { body: JSON.stringify(getBody()) })
      })

      return await res.json()
    }
  }
}
