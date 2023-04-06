import Base from './base.svelte'
import initAttrMerge from './initAttrMerge'

import type { ComponentConstructorOptions } from 'svelte'
import type { InitAttr, Variants } from './types'


const defaultAttr: InitAttr = {
  ripple: true
}

const createInstance = <V>(def: Variants<V>) => {
  if (typeof window === 'undefined') return Base

  class Ripple extends Base {
    constructor(options: ComponentConstructorOptions<Record<string, any>>) {
      super({...options, props: { ...options.props, variants: def }})
    }
  }
  return Ripple
}

const mergeAttr = <V>(initVariants?: Variants<V>) => {
  const variants: any = {
    primary: { ...defaultAttr, ...initVariants?.primary },
    ...initVariants
  }

  if (!initVariants) return variants

  for (const [variant, variantAttr] of Object.entries(variants)) {
    variants[variant] = initAttrMerge(defaultAttr, variantAttr as InitAttr)
  }
  return variants
}

export const createRipple = <V>(initVariants?: Variants<V>) => {
  const variants = mergeAttr(initVariants)

  return createInstance(variants)
}
