import Base from './base'

class Echo extends Base {
  constructor() {
    super({ API_KEY: 'ECHO_URL' })
  }

  root = this.apiGenerator({ url: '/', method: 'get' })
  test = this.apiGenerator({ url: '/test' })
}

export default new Echo()
