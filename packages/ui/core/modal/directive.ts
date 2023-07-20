import { createEventDispatcher } from 'svelte'
import { GenOrGetModalRoot, removeModalRootIfEmpty } from './utils'


export const portal = (node: HTMLElement) => {
  const modalRoot = GenOrGetModalRoot()
  modalRoot.appendChild(node)

  return {
    destroy() {
      removeModalRootIfEmpty()
    }
  }
}

export const dismiss = (node: HTMLElement) => {
  const handleClick = (event: PointerEvent) => {
    if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent('dismiss')
      )
    }

  }
  document.addEventListener('click', handleClick, true)

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true)
    }
  }
}
