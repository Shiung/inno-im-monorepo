import Base from '../base'
import type * as Types from './types'

class IM extends Base {
  constructor() {
    super({ API_KEY: 'IM_API_URL' })
  }

  webAnchors = this.apiGenerator<Types.IWebAnchors>({ url: '/anchor/web-anchors' })
  webAnchorDetail = this.apiGenerator<Types.IWebAnchorDetail>({ url: '/anchor/web-anchor/detail' })
  webAnchorMatchList = this.apiGenerator<Types.IWebAnchorMatches>({ url: '/anchor/web-anchor/match-list' })
  webAnchorLife = this.apiGenerator<Types.IWebAnchorLife>({ url: '/anchor/web-anchor/life' })
  expertPredictions = this.apiGenerator<Types.IExpertPredictions>({ url: '/expert/predictions' })
  webAnchorRecommend = this.apiGenerator<Types.IWebAnchorRecommend>({ url: '/anchor/web-anchor/recommend' })
}

export default new IM()
