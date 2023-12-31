import { createServer } from 'http'
import { URLSearchParams, parse } from 'url'

import { createStompSocketServer } from './stomp'
import { createProtoSocketServer } from './protobuf'
import { createEchoSocketServer } from './echo'
import moduleDict from './moduleDict'
import type { IMockData, IMethod } from './types'

const app = createServer()
const stompSocketServer = createStompSocketServer()
const protoSocketServer = createProtoSocketServer()
const echoSocketServer = createEchoSocketServer()

const getPathAndModule = (path: string) => {
  const pathArray = path.split('/')
  pathArray.shift() // remove first /
  const apiUrl = pathArray.shift()
  const _path = `/${pathArray.join('/')}`
  const _module = moduleDict[apiUrl || '']
  return {
    path: _path,
    module: _module
  }
}

const getMockData = (module: IMockData[], method: IMethod, path: string) => {
  const defGetData = module.map((data: IMockData) => ({
    ...data,
    method: data?.method || 'get'
  }))

  const dataArray = defGetData.filter((data: IMockData) => data.url === path)
  const mockData = dataArray.find((data: IMockData) => data.method === method)
  return mockData
}

app.on('request', async (req, res) => {
  const { pathname, query: _query } = parse(req?.url || '')
  const query = Object.fromEntries(new URLSearchParams(_query || ''))
  const method = req.method?.toLocaleLowerCase() as IMethod

  if (!req.url) return res.end()

  res.writeHead(200, {
    'Access-Control-Allow-Origin': req?.headers?.origin || '*',
    'Access-Control-Allow-Headers': '*', //'Content-Type',
    'Content-Type': 'application/json'
  })

  const { path, module } = getPathAndModule(pathname || '')

  const mod = await module()
  const mockData = getMockData(mod.default, method, path)

  if (method === 'options') return res.end()

  setTimeout(() => {
    if (!mockData) return res.end(JSON.stringify({ data: 'no such mock data.' }))
    else return res.end(JSON.stringify(mockData?.response({ query })))
  }, mockData?.timeout || 200)
})


app.on('upgrade', (req, socket, head) => {
  const { pathname } = parse(req?.url || '')

  if (pathname?.match('/stomp')) {
    stompSocketServer.handleUpgrade(req, socket, head, (ws) => {
      stompSocketServer.emit('connection', ws, req)
    })
  }

  else if (pathname?.match('/proto')) {
    protoSocketServer.handleUpgrade(req, socket, head, (ws) => {
      protoSocketServer.emit('connection', ws, req)
    })
  }

  else if (pathname?.match('/echo')) {
    echoSocketServer.handleUpgrade(req, socket, head, (ws) => {
      echoSocketServer.emit('connection', ws, req)
    })
  }
})

app.listen(5174)
