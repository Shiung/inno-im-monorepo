import './common.css'
import { im } from 'api'
import { initVender } from 'utils'
import { getConfig } from 'env-config'
import { userAuth, type IUserAuth } from '$stores/user'

const setImHeaders = (userAuth: IUserAuth) => {
  im.setHeaders((headers) => {
    const { userToken } = userAuth
    const headersObj = {
      ...headers,
      ...(userToken && {
        Authorization: `Bearer ${userToken}`
      }),
      Pvd: String(getConfig().vendor_id)
    }

    !userToken && 'Authorization' in headersObj && delete headersObj.Authorization
    return headersObj
  })
}

userAuth.subscribe(setImHeaders)


initVender({
  repoName: 'im-monorepo'
})
