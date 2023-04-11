import express from 'express'
import cors from 'cors'

import type { IMockData, IMethod } from'./types'

const moduleDict: { [apiUrl: string]: () => Promise<any>} = {
  ECHO_URL: () => import('./mock/echo'),
  IM_BE_URL: () => import('./mock/im')
}

let app = express()
app.use(cors())

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

app.all('*', async (req, res) => {
  const method = req.method.toLocaleLowerCase() as IMethod

  const { path, module } = getPathAndModule(req.path)
  if (!module) return res.status(404).json({ data: 'no such API_URL' })

  const mod = await module()
  const mockData = getMockData(mod.default, method, path)
  if (!mockData?.response) return res.status(404).json({ data: 'no such MockData' })
  

  setTimeout(() => {
    const mockData = getMockData(mod.default, method, path)
    if (!mockData?.response) return res.status(404).json({ data: 'no such MockData' })
  
    res.json(mockData.response(req))
  }, mockData.timeout || 200)
})

app.listen(5174)
