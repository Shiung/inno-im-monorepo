import Base from './base.svelte'
import { initAttrMerge } from './utils'

import type { ComponentConstructorOptions } from 'svelte'
import type { InitAttr, Variants } from './types'


const defaultAttr: InitAttr = {
  className: [
    'inline-flex items-center justify-center px-[15px] h-[32px] rounded-[5px] text-[12px] ',
    'bg-[#4C9EEA] text-[white] hover:bg-[#7EB8EE]',
  ].join(' '),
  ripple: true
}

const createInstance = <V>(def: Variants<V>) => {
  if (typeof window === 'undefined') return Base

  class Button extends Base {
    constructor(options: ComponentConstructorOptions<Record<string, any>>) {
      super({...options, props: { ...options.props, variants: def }})
    }
  }
  return Button
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

export const createButton = <V>(initVariants?: Variants<V>) => {
  const variants = mergeAttr(initVariants)

  return createInstance(variants)
}

