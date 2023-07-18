
declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    'on:dismiss'?: (node: Element) => void
  }
}
