import { writable } from 'svelte/store'
import { getConfig } from 'env-config'

export const res = writable((_path: string) => '')

const setStore = <T>(_module: T) => {
  res.set((path: string) => {
    return _module[path]
  })
}

const loadResource = async () => {
  switch (getConfig().VENDERID) {
    case 'vd001': 
      const vd001 = await import('./vd001')
      return setStore(vd001)
    case 'vd002': 
      const vd002 = await import('./vd002')
      return setStore(vd002)
    case 'vd003': 
      const vd003 = await import('./vd003')
      return setStore(vd003)
    case 'vd004': 
      const vd004 = await import('./vd004')
      return setStore(vd004)
    // case 'vd005': 
    //   const vd005 = await import('./vd005')
    //   return setStore(vd005)
    case 'vd006': 
      const vd006 = await import('./vd006')
      return setStore(vd006)
    case 'vd007': 
      const vd007 = await import('./vd007')
      return setStore(vd007)
    case 'vd008': 
      const vd008 = await import('./vd008')
      return setStore(vd008)
    case 'vd009': 
      const vd009 = await import('./vd009')
      return setStore(vd009)
  }
}

loadResource()
