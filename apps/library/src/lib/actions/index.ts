export const fetchIp = async() => {
  const res = await fetch('https://echo.zuplo.io')
  const body = await res.json()
  console.log('echo body: ', body)
}
