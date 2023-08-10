import { writable } from 'svelte/store'
import BigNumber from 'bignumber.js'

export const bottomNav = writable<string>()
export const showBottomNav = writable<boolean>(true)
export const appHeight = writable<number>(0)

interface DeviceSize {
  width: number
  height: number
}

const initDeviceSize = {
  width: window.innerWidth,
  height: window.innerHeight
}

const checkIsMd = (width: number) => {
  if (!Object(process.env.SCREENS)?.md) return false
  return width >= Object(process.env.SCREENS).md
}

const checkIsLg = (width: number) => {
  if (!Object(process.env.SCREENS)?.lg) return false
  return width >= Object(process.env.SCREENS).lg
}

const checkIsXl = (width: number) => {
  if (!Object(process.env.SCREENS)?.xl) return false
  return width >= Object(process.env.SCREENS).xl
}

export const deviceSize = writable<DeviceSize>(initDeviceSize)

export const isMd = writable<boolean>(checkIsMd(window.innerWidth))
export const isLg = writable<boolean>(checkIsLg(window.innerWidth))
export const isXl = writable<boolean>(checkIsXl(window.innerWidth))

deviceSize.subscribe(({ width }) => {
  isMd.set(checkIsMd(width))
  isLg.set(checkIsLg(width))
  isXl.set(checkIsXl(width))
})

export const setImVh = () => {
  const vh = new BigNumber(window.innerHeight * 0.01).toFixed(2)
  document.body.style.setProperty('--im-monorepo-vh', `${vh}px`)
  appHeight.set(Number(vh))
}

export const setDeviceSize = () => {
  deviceSize.set({
    width: window.innerWidth,
    height: window.innerHeight,
  })
}