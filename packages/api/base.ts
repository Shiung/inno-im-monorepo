import { getConfig } from 'env-config'
import type { WindowEnv } from 'env-config/types'

import type { IApiInit, RequestWrap } from './types'

export default class Base {
  private baseUrl: string

  constructor({ API_KEY }: { API_KEY: keyof WindowEnv }) {
    try {
      const baseUrl = getConfig()[API_KEY]
      if (!baseUrl) throw('[missing a certain API_KEY]')

      this.baseUrl = getConfig()[API_KEY]

    } catch (e) {
      console.error(e, `missing ${API_KEY} at window._env_`) 
    }
  }

  private genParams(params?: { [k: string]: string }) {
    if (!params) return ''
    const urlParams = new URLSearchParams(params).toString()
    return `?${urlParams}`
  }

  protected apiGenerator({ url, method }: IApiInit) {

    return async (request?: RequestWrap) => {
      const _method = request?.method || method
      const _request = { ...request, body: null }

      const getBody = () => {
        if (_method === 'get') return null
        return request?.body
      }

      const _url = `${this.baseUrl}${url}${this.genParams(request?.params)}`

      const res = await fetch(_url, {
        ..._request,
        method: _method,
        headers: {
          'Content-Type': 'application/json',
          ...request?.headers
        },
        ...(getBody() && { body: JSON.stringify(getBody()) })
      })

      return await res.json()
    }
  }
}
