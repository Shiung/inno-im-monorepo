import '@testing-library/jest-dom'
import createWebsocket from '../index'

const ws = createWebsocket({
  url: 'ws://localhost:5174/echo',
  binaryType: 'arraybuffer',
  messagePreparser: (e) => {
    const data = Buffer.from(e.data).toString()
    return JSON.parse(data)
  },
  activate: true
})

describe('wsMaster', () => {

  test('messagePreparser, publish', async () => {
    let msg = 'hello world'

    const data = JSON.stringify({ eventkey: 'hello', pairId: 'world', data: msg })
    const res = await ws.publish({ eventkey: 'hello', pairId: 'world', data })

    expect(res.data).toBe(msg)
  })
})
