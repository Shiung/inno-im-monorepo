import type { ComponentConstructorOptions, SvelteComponent } from 'svelte'

export type Variants<T, IAttr> = {
  [K in keyof T]: IAttr
} & { primary?: IAttr }


interface ICreateInstance<T, IComponentAttr> {
  baseComponent: typeof SvelteComponent
  defaultAttr?: IComponentAttr
  initVariants?: Variants<T, IComponentAttr>,
  attrMerge: (def: IComponentAttr, item: IComponentAttr) => IComponentAttr
}

const createInstance = <T, IComponentAttr>(props: ICreateInstance<T, IComponentAttr>) => {
  const { baseComponent: Base, defaultAttr, initVariants, attrMerge } = props

  const primary = { ...defaultAttr, ...initVariants?.primary }
  let merged = { primary, ...initVariants } as {[k in keyof T]: IComponentAttr} & { primary: IComponentAttr }

  const mergeAttr = () => {
    if (!initVariants) return

    for (const [variant, variantAttr] of Object.entries(initVariants)) {
      console.log('variant', variant, variantAttr)
      merged[variant] = attrMerge(defaultAttr || {} as IComponentAttr, variantAttr)
    }
  }

  mergeAttr()

  if (typeof window === 'undefined') return Base

  class Instance extends Base {
    constructor(options: ComponentConstructorOptions<Record<string, any>>) {
      super({...options, props: { ...options.props, variants: merged }})
    }
  } 

  return Instance
}

export default createInstance
