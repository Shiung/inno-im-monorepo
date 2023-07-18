// svg
declare module '*.svg' {
  import type { ComponentType, SvelteComponentTyped } from 'svelte'
  import type { SVGAttributes } from 'svelte/elements'

  const content: ComponentType<
    SvelteComponentTyped<SVGAttributes<SVGSVGElement>>
  >

  export default content
}

declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    'on:dismiss'?: (node: Element) => void
  }
}
