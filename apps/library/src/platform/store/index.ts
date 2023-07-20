import { writable } from 'svelte/store'

import type { Writable } from 'svelte/store'
import type { IPlatformAnchor } from '../anchors/types'


const createAnchors = () => {
  const list = writable<string[]>()
  const anchorsMap = new Map<string, Writable<IPlatformAnchor>>() 
  
  const update = (anchors: IPlatformAnchor[]) => {
    for (const anchor of anchors) {
      const houseId = anchor.houseId

      if (anchorsMap.has(houseId)) anchorsMap.get(houseId).set(anchor)
      else anchorsMap.set(houseId, writable(anchor))
    }
  }

  const set = (anchors: IPlatformAnchor[]) => {
    const houseIdSet = new Set([
      ...Array.from(anchorsMap, ([houseId, _]) => houseId),
      ...Array.from(anchors, (anchor) => anchor.houseId) 
    ])
    
    for (const houseId of houseIdSet) {
      const inMap = anchorsMap.has(houseId)
      const newAnchor = anchors.find(anchor => anchor.houseId === houseId)
      
      if (newAnchor && inMap) anchorsMap.get(houseId).set(newAnchor)
      else if (newAnchor && !inMap) anchorsMap.set(houseId, writable(newAnchor))
      else if (!newAnchor && inMap) anchorsMap.delete(houseId)
    }
  }

  const updateList = () => list.set(Array.from(anchorsMap, ([houseId, _]) => houseId))

  return {
    list,
    set: (anchors: IPlatformAnchor[]) => {
      set(anchors)
      updateList()
    },

    update: (anchors: IPlatformAnchor[]) => {
      update(anchors)
      updateList()
    },

    get: (houseId: string) => anchorsMap.get(houseId)
  }
}

export const list = createAnchors()
export const streaming = writable<IPlatformAnchor>()
