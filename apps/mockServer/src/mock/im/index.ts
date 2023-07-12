import webAnchor from './webAnchor'
import expert from './expert'
import chatroom from './chatroom'

import type { IMockData } from '../../types'

export default [
  ...webAnchor,
  ...expert,
  ...chatroom
] as IMockData[]
