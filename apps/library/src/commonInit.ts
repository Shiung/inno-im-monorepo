import './common.css'
import { im } from 'api'
import { initVender } from 'utils'
import { getConfig } from 'env-config'
import { userAuth, type IUserAuth } from '$stores/user'

const setImHeaders = (userAuth: IUserAuth) => {
  im.setHeaders((headers) => ({
    ...headers,
    ...(userAuth.userToken && {
      Authorization: `Bearer ${userAuth.userToken}`
    }),
    Pvd: String(getConfig().vendor_id)
  }))
}

userAuth.subscribe(setImHeaders)


initVender({
  repoName: 'im-monorepo'
})
