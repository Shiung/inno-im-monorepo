import { twMerge } from 'tailwind-merge'
import Base from './base.svelte'
import { hasRipple } from '../utils'
import createInstance from '../utils/createInstance'

import type { Variants } from '../utils/createInstance'

export interface IComponentAttr {
  className?: string
  ripple?: boolean | string
}

export const createRipple = <T>(initVariants?: Variants<T, IComponentAttr>) => {
  return createInstance({
    baseComponent: Base,
    defaultAttr: {
      ripple: true
    },
    initVariants,
    attrMerge: (def, item) => ({
      className: twMerge(def.className, item.className),
      ripple: hasRipple(item.ripple) ? item.ripple : def.ripple
    })
  })
}
