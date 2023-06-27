import { getConfig } from 'env-config'
import { getVendorTheme } from 'utils'
const avatarMap = new Map()

export const fetchAvatar = async (id: string) => {
  if(avatarMap.has(id)) return avatarMap.get(id)

  let path
  switch (id) {
    case '0': {
      const promise = await import('$src/assets/avatar/0.png')
      path = promise?.default
      break
    }
    case '1': {
      const promise = await import('$src/assets/avatar/1.png')
      path = promise?.default
      break
    }
    case '2': {
      const promise = await import('$src/assets/avatar/2.png')
      path = promise?.default
      break
    }
    case '3': {
      const promise = await import('$src/assets/avatar/3.png')
      path = promise?.default
      break
    }
    case '4': {
      const promise = await import('$src/assets/avatar/4.png')
      path = promise?.default
      break
    }
    case '5': {
      const promise = await import('$src/assets/avatar/5.png')
      path = promise?.default
      break
    }
    case '6': {
      const promise = await import('$src/assets/avatar/6.png')
      path = promise?.default
      break
    }
    case '7': {
      const promise = await import('$src/assets/avatar/7.png')
      path = promise?.default
      break
    }
    case '8': {
      const promise = await import('$src/assets/avatar/8.png')
      path = promise?.default
      break
    }
    case '9': {
      const promise = await import('$src/assets/avatar/9.png')
      path = promise?.default
      break
    }
    case '10':{
      const promise = await import('$src/assets/avatar/10.png')
      path = promise?.default
      break
    }
    case '11':{
      const promise = await import('$src/assets/avatar/11.png')
      path = promise?.default
      break
    }
    case '12':{
      const promise = await import('$src/assets/avatar/12.png')
      path = promise?.default
      break
    }
    case '13':{
      const promise = await import('$src/assets/avatar/13.png')
      path = promise?.default
      break
    }
    case '14':{
      const promise = await import('$src/assets/avatar/14.png')
      path = promise?.default
      break
    }
    case '15':{
      const promise = await import('$src/assets/avatar/15.png')
      path = promise?.default
      break
    }
    case '16':{
      const promise = await import('$src/assets/avatar/16.png')
      path = promise?.default
      break
    }
    case '17':{
      const promise = await import('$src/assets/avatar/17.png')
      path = promise?.default
      break
    }
    case '18':{
      const promise = await import('$src/assets/avatar/18.png')
      path = promise?.default
      break
    }
    case '19':{
      const promise = await import('$src/assets/avatar/19.png')
      path = promise?.default
      break
    }
    case '20':{
      const promise = await import('$src/assets/avatar/20.png')
      path = promise?.default
      break
    }
    case '21':{
      const promise = await import('$src/assets/avatar/21.png')
      path = promise?.default
      break
    }
    case '22':{
      const promise = await import('$src/assets/avatar/22.png')
      path = promise?.default
      break
    }
    case '23':{
      const promise = await import('$src/assets/avatar/23.png')
      path = promise?.default
      break
    }
    case '24':{
      const promise = await import('$src/assets/avatar/24.png')
      path = promise?.default
      break
    }
    case '25':{
      const promise = await import('$src/assets/avatar/25.png')
      path = promise?.default
      break
    }
    case '26':{
      const promise = await import('$src/assets/avatar/26.png')
      path = promise?.default
      break
    }
    case '27':{
      const promise = await import('$src/assets/avatar/27.png')
      path = promise?.default
      break
    }
    case '28':{
      const promise = await import('$src/assets/avatar/28.png')
      path = promise?.default
      break
    }
    case '29':{
      const promise = await import('$src/assets/avatar/29.png')
      path = promise?.default
      break
    }
    case '30':{
      const promise = await import('$src/assets/avatar/30.png')
      path = promise?.default
      break
    }
    case '31':{
      const promise = await import('$src/assets/avatar/31.png')
      path = promise?.default
      break
    }
    case '32':{
      const promise = await import('$src/assets/avatar/32.png')
      path = promise?.default
      break
    }
    case '33':{
      const promise = await import('$src/assets/avatar/33.png')
      path = promise?.default
      break
    }
    case '34':{
      const promise = await import('$src/assets/avatar/34.png')
      path = promise?.default
      break
    }
    case '35':{
      const promise = await import('$src/assets/avatar/35.png')
      path = promise?.default
      break
    }
    case '36':{
      const promise = await import('$src/assets/avatar/36.png')
      path = promise?.default
      break
    }
    case '37':{
      const promise = await import('$src/assets/avatar/37.png')
      path = promise?.default
      break
    }
    case '38':{
      const promise = await import('$src/assets/avatar/38.png')
      path = promise?.default
      break
    }
    case '39':{
      const promise = await import('$src/assets/avatar/39.png')
      path = promise?.default
      break
    }
    case '40':{
      const promise = await import('$src/assets/avatar/40.png')
      path = promise?.default
      break
    }
    case '41':{
      const promise = await import('$src/assets/avatar/41.png')
      path = promise?.default
      break
    }
    case '42':{
      const promise = await import('$src/assets/avatar/42.png')
      path = promise?.default
      break
    }
    case '43':{
      const promise = await import('$src/assets/avatar/43.png')
      path = promise?.default
      break
    }
    case '44':{
      const promise = await import('$src/assets/avatar/44.png')
      path = promise?.default
      break
    }
    case '45':{
      const promise = await import('$src/assets/avatar/45.png')
      path = promise?.default
      break
    }
    case '46':{
      const promise = await import('$src/assets/avatar/46.png')
      path = promise?.default
      break
    }
    case '47':{
      const promise = await import('$src/assets/avatar/47.png')
      path = promise?.default
      break
    }
    case '48':{
      const promise = await import('$src/assets/avatar/48.png')
      path = promise?.default
      break
    }
    case '49':{
      const promise = await import('$src/assets/avatar/49.png')
      path = promise?.default
      break
    }
    case '50':{
      const promise = await import('$src/assets/avatar/50.png')
      path = promise?.default
      break
    }
    case '51':{
      const promise = await import('$src/assets/avatar/51.png')
      path = promise?.default
      break
    }
    case '52':{
      const promise = await import('$src/assets/avatar/52.png')
      path = promise?.default
      break
    }
    case '53':{
      const promise = await import('$src/assets/avatar/53.png')
      path = promise?.default
      break
    }
    case '54':{
      const promise = await import('$src/assets/avatar/54.png')
      path = promise?.default
      break
    }
    case '55':{
      const promise = await import('$src/assets/avatar/55.png')
      path = promise?.default
      break
    }
    case '56':{
      const promise = await import('$src/assets/avatar/56.png')
      path = promise?.default
      break
    }
    case '57':{
      const promise = await import('$src/assets/avatar/57.png')
      path = promise?.default
      break
    }
    case '58':{
      const promise = await import('$src/assets/avatar/58.png')
      path = promise?.default
      break
    }
    case '59':{
      const promise = await import('$src/assets/avatar/59.png')
      path = promise?.default
      break
    }
    case '60':{
      const promise = await import('$src/assets/avatar/60.png')
      path = promise?.default
      break
    }
    case '61':{
      const promise = await import('$src/assets/avatar/61.png')
      path = promise?.default
      break
    }
    case '62':{
      const promise = await import('$src/assets/avatar/62.png')
      path = promise?.default
      break
    }
    case '63':{
      const promise = await import('$src/assets/avatar/63.png')
      path = promise?.default
      break
    }
    case '64':{
      const promise = await import('$src/assets/avatar/64.png')
      path = promise?.default
      break
    }
    case '65':{
      const promise = await import('$src/assets/avatar/65.png')
      path = promise?.default
      break
    }
    case '66':{
      const promise = await import('$src/assets/avatar/66.png')
      path = promise?.default
      break
    }
    case '67':{
      const promise = await import('$src/assets/avatar/67.png')
      path = promise?.default
      break
    }
    case '68':{
      const promise = await import('$src/assets/avatar/68.png')
      path = promise?.default
      break
    }
    case '69':{
      const promise = await import('$src/assets/avatar/69.png')
      path = promise?.default
      break
    }
    default: {
      break
    }
  }

  if(path) avatarMap.set(id, path)
  return path
}

const vipMap = new Map()

const fetchVendorVip = (vendor: string) => {
  return async (id: number) => {
    if(vipMap.has(id)) return vipMap.get(id)

    let path
    switch (id) {
      case 0: {
        let promise
        if (vendor === 'vd002') promise = await import('$src/assets/vip/vd002/0.png')
        else if (vendor === 'vd004') promise = await import('$src/assets/vip/vd004/0.png')
        path = promise?.default
        break
      }
      case 1: {
        let promise
        if (vendor === 'vd002') promise = await import('$src/assets/vip/vd002/1.png')
        else if (vendor === 'vd004') promise = await import('$src/assets/vip/vd004/1.png')
        path = promise?.default
        break
      }
      case 2: {
        let promise
        if (vendor === 'vd002') promise = await import('$src/assets/vip/vd002/2.png')
        else if (vendor === 'vd004') promise = await import('$src/assets/vip/vd004/2.png')
        path = promise?.default
        break
      }
      case 3: {
        let promise
        if (vendor === 'vd002') promise = await import('$src/assets/vip/vd002/3.png')
        else if (vendor === 'vd004') promise = await import('$src/assets/vip/vd004/3.png')
        path = promise?.default
        break
      }
      case 4: {
        let promise
        if (vendor === 'vd002') promise = await import('$src/assets/vip/vd002/4.png')
        else if (vendor === 'vd004') promise = await import('$src/assets/vip/vd004/4.png')
        path = promise?.default
        break
      }
      case 5: {
        let promise
        if (vendor === 'vd002') promise = await import('$src/assets/vip/vd002/5.png')
        else if (vendor === 'vd004') promise = await import('$src/assets/vip/vd004/5.png')
        path = promise?.default
        break
      }
      case 6: {
        let promise
        if (vendor === 'vd002') promise = await import('$src/assets/vip/vd002/6.png')
        else if (vendor === 'vd004') promise = await import('$src/assets/vip/vd004/6.png')
        path = promise?.default
        break
      }
      case 7: {
        let promise
        if (vendor === 'vd002') promise = await import('$src/assets/vip/vd002/7.png')
        else if (vendor === 'vd004') promise = await import('$src/assets/vip/vd004/7.png')
        path = promise?.default
        break
      }
      case 8: {
        let promise
        if (vendor === 'vd002') promise = await import('$src/assets/vip/vd002/8.png')
        else if (vendor === 'vd004') promise = await import('$src/assets/vip/vd004/8.png')
        path = promise?.default
        break
      }
      case 9: {
        let promise
        if (vendor === 'vd002') promise = await import('$src/assets/vip/vd002/9.png')
        else if (vendor === 'vd004') promise = await import('$src/assets/vip/vd004/9.png')
        path = promise?.default
        break
      }
      case 10: {
        let promise
        if (vendor === 'vd002') promise = await import('$src/assets/vip/vd002/10.png')
        else if (vendor === 'vd004') promise = await import('$src/assets/vip/vd004/10.png')
        path = promise?.default
        break
      }
      default: {
        break
      }
    }

    if(path) vipMap.set(id, path)
    return path
  }
}

export const fetchVip = fetchVendorVip(getVendorTheme(getConfig()?.VENDERID || 'vd004'))