import UAParser from 'ua-parser-js'

const ua = new UAParser()

export enum MobileOS {
  iOS = 'iOS',
  Android = 'Android',
  HarmonyOS = 'HarmonyOS',
  UNKNOWN = 'unknown'
}

export const getMobileOSInfo = () => {
  const os = ua.getOS()

  switch(os.name) {
    case 'Android':
    case 'HarmonyOS':
      return MobileOS.Android
    case 'iOS':
      return MobileOS.iOS
    default:
      return MobileOS.UNKNOWN
  }
}