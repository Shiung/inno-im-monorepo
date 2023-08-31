import { getConfig } from 'env-config'
import { getVendorTheme } from 'utils'

/**
 * Follow/Show, 跟單/曬單
 * vd002: light blue
 * vd004: dark blue
 */
const getVendorBetOrderAction = (vendor: string) => async (_type: string, _lang: string, _status: string) => {
  const _vendor = vendor === 'vd002' ? 'vd002' : 'vd004'
  const image = await import(`../images/vendors/${_vendor}/${_type}_${_lang}_${_status}.png`)
  return image
}

export const getBetOrderAction = getVendorBetOrderAction(getVendorTheme(getConfig()?.VENDERID || 'vd004'))
