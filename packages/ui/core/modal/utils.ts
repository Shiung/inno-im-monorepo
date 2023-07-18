import './modal.css'

export const CONTAINER_ID = 'b_core__modal__Root'

export const GenOrGetModalRoot = () => {
  let container = document.getElementById(CONTAINER_ID)
  if (container) return container

  container = document.createElement('div')
  container.setAttribute('id', CONTAINER_ID)
  container.className = 'b_core__modal__container'
  document.body.appendChild(container)
  document.body.style.overflow = 'hidden'
  return container
}

export const removeModalRootIfEmpty = (args?: { delay?: number }) => {
  const delay = args?.delay || 0
  setTimeout(() => {
    const container = document.getElementById(CONTAINER_ID)
    const hasChildren = !!container?.hasChildNodes()
    if (!hasChildren) {
      container?.remove()
      document.body.style.overflow = 'auto'
    }
  }, delay)
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
