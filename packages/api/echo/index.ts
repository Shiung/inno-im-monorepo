import Base from '../base'

class Echo extends Base {
  constructor() {
    super({ API_KEY: 'ECHO_URL' })
  }

  root = this.apiGenerator({ url: '/', method: 'get' })
  users = this.apiGenerator({ url: '/users' })
}

export default new Echo()
