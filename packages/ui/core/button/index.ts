import { twMerge } from 'tailwind-merge'
import Base from './base.svelte'
import { hasRipple } from '../utils'
import createInstance from '../utils/createInstance'

import type { Variants } from '../utils/createInstance'

export interface IComponentAttr {
  className?: string
  ripple?: boolean | string
}

export const createButton = <T>(initVariants?: Variants<T, IComponentAttr>) => {
  return createInstance({
    baseComponent: Base,
    defaultAttr: {
      className: [
        'inline-flex items-center justify-center px-[15px] h-[32px] rounded-[5px] text-[12px] ',
        'bg-[#4C9EEA] text-[white] hover:bg-[#7EB8EE]',
      ].join(' '),
      ripple: true
    },
    initVariants,
    attrMerge: (def, item) => ({
      className: twMerge(def.className, item.className),
      ripple: hasRipple(item.ripple) ? item.ripple : def.ripple
    })
  })
}
