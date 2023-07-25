type Controller = {
  ctl: AbortController
  key: string
  isAborted: boolean
}

class AbortControllers {
  #controllers: Map<string, Controller[]> = new Map()

  abortControllers = (key: string) => {
    if (!this.#controllers.has(key)) return

    const controllers = this.#controllers.get(key)
    controllers?.forEach((controller) => {
      controller.ctl.abort()
      controller.isAborted = true
    })
  }

  spliceController = (controller: Controller) => {
    if (!this.#controllers.has(controller.key)) return

    const controllers = this.#controllers.get(controller.key)
    const currentIndex = controllers?.indexOf(controller) || -1

    if (currentIndex !== -1) controllers?.splice(currentIndex, 1)
    if (!controllers.length) this.#controllers.delete(controller.key)
  }

  addController(controller: Controller) {
    if (!this.#controllers.has(controller.key)) {
      this.#controllers.set(controller.key, [])
    }
    this.#controllers.get(controller.key).push(controller)
  }
}

export default AbortControllers