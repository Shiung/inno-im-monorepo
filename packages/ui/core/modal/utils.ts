import './modal.css'

export const CONTAINER_ID = 'b_core__modal__Root'
export const MODAL_CONTAINER_CLASSNAME = 'b_core__modal__container'

export const GenOrGetModalRoot = () => {
  let container = document.getElementById(CONTAINER_ID)
  if (container) return container

  container = document.createElement('main')
  container.setAttribute('id', CONTAINER_ID)
  container.className = 'im-library' // for css applied correctly due to root selector

  const modalContainer = document.createElement('div')
  modalContainer.className = MODAL_CONTAINER_CLASSNAME
  container.appendChild(modalContainer)

  document.body.appendChild(container)
  document.body.style.overflow = 'hidden'
  return modalContainer
}

export const removeModalRootIfEmpty = (args?: { delay?: number }) => {
  const delay = args?.delay || 0
  setTimeout(() => {
    const modalContainer = document.querySelector(`.${MODAL_CONTAINER_CLASSNAME}`)
    const hasChildren = !!modalContainer?.hasChildNodes()
    if (!hasChildren) {
      let container = document.getElementById(CONTAINER_ID)
      container?.remove()
      document.body.style.overflow = 'auto'
    }
  }, delay)
}

export const removePortalElementWhenDestroyed = (args?: { node?: HTMLElement; delay?: number }): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const modalContainer = document.querySelector(`.${MODAL_CONTAINER_CLASSNAME}`)
      if (modalContainer && modalContainer.contains(args?.node)) {
        modalContainer.removeChild(args?.node)
      }
      resolve()
    }, args?.delay || 0)
  })
}

export const removeModalRoot = (args?: { delay?: number }) => {
  const delay = args.delay || 0
  setTimeout(() => {
    const container = document.getElementById(CONTAINER_ID)
    if (container) {
      container.remove()
      document.body.style.overflow = 'auto'
    }
  }, delay)
}
