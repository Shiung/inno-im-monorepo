import { twMerge } from 'tailwind-merge'
import Base from './base.svelte'
import createInstance from '../../../utils/createInstance'

import type { Variants } from '../../../utils/createInstance'

export interface IComponentAttr {
  className?: string
}

export const createModal = <T>(initVariants?: Variants<T, IComponentAttr>) => {
  return createInstance({
    baseComponent: Base,
    defaultAttr: {
      className: 'fixed'
    },
    initVariants,
    attrMerge: (def, item) => ({
      className: twMerge(def.className, item.className)
    })
  })
}
