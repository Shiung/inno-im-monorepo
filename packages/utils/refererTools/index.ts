export const getReferer = () => window.origin

export const getBase64 = () => window.btoa(getReferer())
