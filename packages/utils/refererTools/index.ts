export const getReferer = () => process.env.login ? 'https://en-vd001-tiger-portal.innodev.site' : window.origin

export const getBase64 = () => window.btoa(getReferer())
