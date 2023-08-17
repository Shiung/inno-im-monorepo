export const getReferer = () => {
  if (process.env.NODE_ENV === 'production') return (window._imLocalWsReferer_ || window.origin)

  return process.env.login ? 'https://en-vd001-tiger-portal.innodev.site' : window.origin
}

export const getBase64 = () => window.btoa(getReferer())
