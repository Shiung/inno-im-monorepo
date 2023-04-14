import { getConfig } from 'env-config'
import type { VENDERID } from 'env-config/types'

const RuiYin = '76 158 234' // #4C9EEA
const GuGoo = '12 24 108' // #0C186C

const vendorPrimary: { [key in VENDERID]: string } = {
  vd001: RuiYin,
  vd002: GuGoo,
  vd003: GuGoo,
  vd004: RuiYin,
  vd005: GuGoo,
  vd006: GuGoo,
  vd007: RuiYin,
  vd008: GuGoo,
  vd009: RuiYin
}

const initColor = (repoName: string) => {
  const style = document.createElement('style')
  style.innerHTML = `:root {--${repoName}-primary:${vendorPrimary[getConfig().VENDERID]}}`
  document.getElementsByTagName('head')[0].appendChild(style)
}

export default (props: { repoName: string }) => {
  const { repoName } = props
  initColor(repoName)
}
