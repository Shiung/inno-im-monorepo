import { twMerge } from 'tailwind-merge'
import Item from './item.svelte'
import createInstance from '../../../utils/createInstance'

import type { Variants } from '../../../utils/createInstance'
import type { SvelteComponent } from 'svelte'

export interface IComponentAttr {
  component?: typeof SvelteComponent
  className?: string
}

export const createItem = <T>(initVariants?: Variants<T, IComponentAttr>) => {
  return createInstance({
    baseComponent: Item,
    defaultAttr: {},
    initVariants,
    attrMerge: (def, item) => ({
      component: item.component || def.component,
      className: twMerge(def.className, item.className)
    })
  })
}
