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
  webAnchorPhotos = this.apiGenerator<Types.IWebAnchorPhotos>({ url: '/anchor/web-anchor/photos' })
  webAnchorInfo = this.apiGenerator<Types.IWebAnchorInfo>({ url: '/anchor/web-anchor/info' })
  webAnchorRecommend = this.apiGenerator<Types.IWebAnchorRecommend>({ url: '/anchor/web-anchor/recommend' })

  expertPredictions = this.apiGenerator<Types.IExpertPredictions>({ url: '/expert/predictions' })
  expertRecommend = this.apiGenerator<Types.IExpertRecommand>({ url: '/expert/recommend' })
  expertInfo = this.apiGenerator<Types.IExpertInfo>({ url: '/expert/info' })
  expertArticleNow = this.apiGenerator<Types.IExpertArthcleNow>({ url: '/article/now' })
  expertArticleHistory = this.apiGenerator<Types.IExpertArthcleHistory>({ url: '/expert/article/history' })
  expertArticleHit = this.apiGenerator<Types.IExpertArthcleHit>({ url: '/expert/article/hit' })
  expertStatistics = this.apiGenerator<Types.IExpertStatistics>({ url: '/expert/statistics' })
}

export default new IM()
