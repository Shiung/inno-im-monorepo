import { twMerge } from 'tailwind-merge'
import Base from './base.svelte'
import createInstance from '../utils/createInstance'

import type { Variants } from '../utils/createInstance'

export interface IComponentAttr {
  className?: string
  background?: string
}

export const createBadget = <T>(initVariants?: Variants<T, IComponentAttr>) => {
  return createInstance({
    baseComponent: Base,
    defaultAttr: {
      className: 'inline-flex rounded-[5px] px-1 text-[12px] bg-[#4C9EEA] text-white'
    },
    initVariants,
    attrMerge: (def, item) => ({
      className: twMerge(def.className, item.className),
      background: item.background || def.background
    })
  })
}
