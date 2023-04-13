import Base from '../base'

class IM extends Base {
  constructor() {
    super({ API_KEY: 'IM_BE_URL' })
  }

  webAnchors = this.apiGenerator({ url: '/anchor/web-anchors' })
  webAnchorsDetail = this.apiGenerator({ url: '/anchor/web-anchor/detail' })
  webAnchorsMatchList = this.apiGenerator({ url: '/anchor/web-anchor/match-list' })
  webAnchorsLife = this.apiGenerator({ url: '/anchor/web-anchor/life' })
  expertPredictions = this.apiGenerator({ url: '/expert/predictions' })
}

export default new IM()
