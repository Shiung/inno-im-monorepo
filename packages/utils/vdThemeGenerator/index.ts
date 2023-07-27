import { getConfig } from 'env-config'
import type { VENDERID } from 'env-config/types'
import themeMap from './map'

const genVendorColorTemplate = (repoName: string, vd: VENDERID): string => {
  const vdThemeMap = themeMap[vd] || {}

  if (typeof vdThemeMap !== 'object' || Array.isArray(vdThemeMap) || vdThemeMap === null) return ''

  let mergedString = ''
  for (const [key, value] of Object.entries(vdThemeMap)) {
    mergedString += `--${repoName}-${key}:${value};\n`
  }

  return mergedString
}

export const initColor = (repoName: string) => {
  const style = document.createElement('style')
  
  style.innerHTML = `:root {${genVendorColorTemplate(repoName, getConfig().VENDERID)}}`

  document.getElementsByTagName('head')[0].appendChild(style)
}