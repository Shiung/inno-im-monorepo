import { twMerge } from 'tailwind-merge'
import { hasRipple } from '../utils'

import type { InitAttr } from './types'

export default (...props: InitAttr[]): InitAttr => {
  const merged: InitAttr = {}

  for (const prop of props) {
    merged.className = twMerge(merged.className, prop.className)
    merged.ripple = hasRipple(prop.ripple) ? prop.ripple : merged.ripple
  }

  return merged
}
