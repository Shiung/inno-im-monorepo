import webAnchor from './webAnchor'
import expert from './expert'
import chatroom from './chatroom'
import user from './user'

import type { IMockData } from '../../types'

export default [
  ...webAnchor,
  ...expert,
  ...chatroom,
  ...user
] as IMockData[]
