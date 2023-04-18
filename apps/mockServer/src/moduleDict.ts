const moduleDict: { [apiUrl: string]: () => Promise<any>} = {
  ECHO_URL: () => import('./mock/echo'),
  IM_API_URL: () => import('./mock/im')
}

export default moduleDict

