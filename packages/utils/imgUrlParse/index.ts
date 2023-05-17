import { getConfig } from 'env-config'

export enum ImageType {
  /** 區域 id ==> cid */
  categories = 1,
  /** 聯賽 id ==> tid */
  tournaments = 2,
  /** 隊伍 id ==> homeId | awayId */
  competitors = 3,
  /** 國旗(網球國旗) cid ==> homeId | awayId */
  countryFlags = 4
}

type PropsType = {
  /**
   * Image 類型:
   * 區域(categories) | 聯賽(tournaments) | 隊伍(competitors) | 國旗(countryFlags)
   */
  type: ImageType,
  /** 未傳入則使用預設業主 icon */
  id?: number
}

/**
 * 取得 (區域|聯賽|隊伍) icon, 未設定 id 返回預設icon
 * @param {PropsType} props icon Type
 * @returns {string} Absolute Url
 */
export const beImgUrlParse = (props: PropsType) => {
  const badgeBase = getConfig()?.BE_CDN_URL
  const vid = getConfig()?.VENDERID

  if (!badgeBase) return ''

  if (typeof props.id === 'number') return `${badgeBase}/badge/${ImageType[props.type]}/${props.id}.png`
  if (vid) return `${badgeBase}/badge/${ImageType[props.type]}/${vid}.png`
  return ''
}