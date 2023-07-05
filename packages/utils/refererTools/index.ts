// export const getReferer = () => window.origin
export const getReferer = () => 'https://en-vd001-tiger-portal.innodev.site'

export const getBase64 = () => window.btoa(getReferer())
