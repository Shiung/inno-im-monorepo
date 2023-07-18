import { twMerge } from 'tailwind-merge'
import Header from './header.svelte'
import createInstance from '../../../utils/createInstance'

import type { Variants } from '../../../utils/createInstance'

export interface IComponentAttr {
  className?: string
}

export const createHeader = <T>(initVariants?: Variants<T, IComponentAttr>) => {
  return createInstance({
    baseComponent: Header,
    defaultAttr: {},
    initVariants,
    attrMerge: (def, item) => ({
      className: twMerge(def.className, item.className)
    })
  })
}
