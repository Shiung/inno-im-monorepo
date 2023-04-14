import Base from '../base'
import type { 
  withData,
  IWebAnchors,
  IWebAnchorMatches,
  IWebAnchorDetail,
  IExpertPredictions
} from './types'

class IM extends Base {
  constructor() {
    super({ API_KEY: 'IM_BE_URL' })
  }

  webAnchors = this.apiGenerator<withData<IWebAnchors>>({ url: '/anchor/web-anchors' })
  webAnchorsDetail = this.apiGenerator<withData<IWebAnchorDetail>>({ url: '/anchor/web-anchor/detail' })
  webAnchorsMatchList = this.apiGenerator<withData<IWebAnchorMatches>>({ url: '/anchor/web-anchor/match-list' })
  webAnchorsLife = this.apiGenerator({ url: '/anchor/web-anchor/life' })
  expertPredictions = this.apiGenerator<withData<IExpertPredictions>>({ url: '/expert/predictions' })
}

export default new IM()
