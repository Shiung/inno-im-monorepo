const moduleDict: { [apiUrl: string]: () => Promise<any>} = {
  ECHO_URL: () => import('./mock/echo'),
  IM_BE_URL: () => import('./mock/im')
}

export default moduleDict

