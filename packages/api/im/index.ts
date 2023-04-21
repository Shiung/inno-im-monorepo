import Base from '../base'
import type { 
  withData,
  IWebAnchors,
  IWebAnchorMatches,
  IWebAnchorDetail,
  IWebAnchorLife,
  IExpertPredictions,
  IWebAnchorRecommend
} from './types'

class IM extends Base {
  constructor() {
    super({ API_KEY: 'IM_API_URL' })
  }

  webAnchors = this.apiGenerator<withData<IWebAnchors>>({ url: '/anchor/web-anchors' })
  webAnchorDetail = this.apiGenerator<withData<IWebAnchorDetail>>({ url: '/anchor/web-anchor/detail' })
  webAnchorMatchList = this.apiGenerator<withData<IWebAnchorMatches>>({ url: '/anchor/web-anchor/match-list' })
  webAnchorsLife = this.apiGenerator<withData<IWebAnchorLife>>({ url: '/anchor/web-anchor/life' })
  expertPredictions = this.apiGenerator<withData<IExpertPredictions>>({ url: '/expert/predictions' })
  webAnchorRecommend = this.apiGenerator<withData<IWebAnchorRecommend>>({ url: '/anchor/web-anchor/recommend' })
}

export default new IM()
