import type { SidType } from '../types'

export default (_sid: string): SidType => {
  switch(_sid) {
    case '0': return 0
    case '1': return 1
    case '2': return 2
    case '3': return 3
    case '4': return 4
    default: return null
  }
}

