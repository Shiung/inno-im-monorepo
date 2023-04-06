export interface InitAttr {
  className?: string
  ripple?: boolean | string
}

export type Variants<V> = {
  [K in keyof V]: InitAttr
} & { primary?: InitAttr }

