import { mock } from 'mockjs'

import { genAnchorList } from './utils'

import type { IMockData } from '../../types'

export default [
  {
    url: '/anchor/web-anchors',
    timeout: 500,
    response: ({ query }) => mock({
      "code": "0",
      "data": {
          "list": genAnchorList(Number(query.pageSize)),
          "pager": {
              "pageIdx": Number(query.pageIdx) || 1,
              "pageSize": Number(query.pageSize),
              "totalPage": 1,
              "totalRow": 2
          }
      },
      "message": "",
    })
  }
] as IMockData[]
