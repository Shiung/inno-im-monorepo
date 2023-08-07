import type { VENDERID } from 'env-config/types'

const theme = {
  ruiYin: {
    primary: '76 158 234', // #4C9EEA
    secondary: '80 189 255' // #50BDFF
  },
  guGe: {
    primary: '12 24 108', // #0C186C
    secondary: '80 84 255' // #5054FF
  }
}

const themeMap: { [key in VENDERID]: { [key: string]: string } } = {
  vd001: theme.ruiYin,
  vd002: theme.guGe,
  vd003: theme.guGe,
  vd004: theme.ruiYin,
  // vd005: theme.guGe,
  vd006: theme.guGe,
  vd007: theme.ruiYin,
  vd008: theme.guGe,
  vd009: theme.ruiYin
}

export default themeMap