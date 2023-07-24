export const dismiss = (node: HTMLElement) => {
  const handleFocus = (e: PointerEvent) => {
    if (node && !node.contains(e.target as Node)) {
      node.dispatchEvent(new CustomEvent('dismiss'))
    }
  }

  document.addEventListener('click', handleFocus, true)

  return {
    destroy() {
      document.removeEventListener('click', handleFocus, true)
    }
  }
}
