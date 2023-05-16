import Base from '../base'
import type * as Types from './types'

class IM extends Base {
  constructor() {
    super({ API_KEY: 'IM_API_URL' })
  }

  webAnchors = this.apiGenerator<Types.IWebAnchors>({ url: '/v1/anchor/web-anchors' })
  webAnchorDetail = this.apiGenerator<Types.IWebAnchorDetail>({ url: '/v1/anchor/web-anchor/detail' })
  webAnchorMatchList = this.apiGenerator<Types.IWebAnchorMatches>({ url: '/v1/anchor/web-anchor/match-list' })
  webAnchorLife = this.apiGenerator<Types.IWebAnchorLife>({ url: '/v1/anchor/web-anchor/life' })
  webAnchorPhotos = this.apiGenerator<Types.IWebAnchorPhotos>({ url: '/v1/anchor/web-anchor/photos' })
  webAnchorInfo = this.apiGenerator<Types.IWebAnchorInfo>({ url: '/v1/anchor/web-anchor/info' })
  webAnchorRecommend = this.apiGenerator<Types.IWebAnchorRecommend>({ url: '/v1/anchor/web-anchor/recommend' })

  expertPredictions = this.apiGenerator<Types.IExpertPredictions>({ url: '/v1/expert/predictions' })
  expertRecommend = this.apiGenerator<Types.IExpertRecommand>({ url: '/v1/expert/recommend' })
  expertInfo = this.apiGenerator<Types.IExpertInfo>({ url: '/v1/expert/info' })
  expertArticleNow = this.apiGenerator<Types.IExpertArticleNow>({ url: '/v1/expert/article/now' })
  expertArticleHistory = this.apiGenerator<Types.IExpertArticleHistory>({ url: '/v1/expert/article/history' })
  expertArticleHit = this.apiGenerator<Types.IExpertArticleHit>({ url: '/v1/expert/article/hit' })
  expertStatistics = this.apiGenerator<Types.IExpertStatistics>({ url: '/v1/expert/statistics' })
  // expertMatchArticle = this.apiGenerator<Types.IExpertMacthArticle>({ url: '/v1/expert/match/article' })
}

export default new IM()
