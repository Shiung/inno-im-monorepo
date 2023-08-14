import { GenOrGetModalRoot, removeModalRootIfEmpty, removePortalElementWhenDestroyed } from './utils'


export const portal = (node: HTMLElement) => {
  const modalRoot = GenOrGetModalRoot()
  modalRoot.appendChild(node)

  return {
    destroy() {
      // code : packages/ui/core/modal/components/base/base.svelte
      // 因為多包了一層 div 在 modal 在 {#if show} 外面
      // 會導致 svelte 在 destroy 被 portal 的元素時沒有正常地從 container 刪除那個元素
      // 使得其留在畫面上，所以必須手動判斷與刪除
      // details: https://github.com/sveltejs/svelte/issues/4036#issuecomment-716341739
      removePortalElementWhenDestroyed({ node })
      .then(() => removeModalRootIfEmpty())
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
