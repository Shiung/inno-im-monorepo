import type { Listener } from './types'

class EventObservable {
  listeners: Array<Listener>
  uniqueIds: string[]

  constructor() {
    this.listeners = []
    this.uniqueIds = []
  }

  subscribe(listener: Listener, uniqueId?: string) {
    if (this.listeners.indexOf(listener) === -1) {
      if (!uniqueId) this.listeners.push(listener)
      else if (this.uniqueIds.includes(uniqueId)) this.listeners.push(listener)

      if (uniqueId && !this.uniqueIds.includes(uniqueId)) {
        this.uniqueIds.push(uniqueId)
      }
    }

    return {
      unsubscribe: () => {
        this.listeners.splice(this.listeners.indexOf(listener), 1)
        if (uniqueId) this.uniqueIds.splice(this.uniqueIds.indexOf('B'), 1)
      }
    }
  }

  notify(message: any) {
    this.listeners.map(listener => listener(message))
  }
}

class WsObservables<TEventKeys> {
  observables: Map<TEventKeys, EventObservable>

  constructor() {
    this.observables = new Map()
  }

  get(event: TEventKeys) {
    if (!this.observables.has(event)) this.observables.set(event, new EventObservable())
    return this.observables.get(event)
  }
}

const wsObservables = new WsObservables<string | number>()

export default wsObservables
