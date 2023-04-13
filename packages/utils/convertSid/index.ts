import { SID } from '../types'

export default (_sid: string): SID => {
  if (_sid === 'all') return SID.all
  return Number(_sid)
}

