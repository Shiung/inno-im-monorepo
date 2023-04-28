import { timestampToFormat } from '../convertDateAndTimestamp'
import type { IDiffPast } from './types'

export const convertTimeDiffToPast = (props: { now: number, past: number }): IDiffPast => {
  const { now, past } = props
  const diff = now - past

  if (diff < 60) return { text: String(diff), unit: 'sec' }
  else if (diff < 3600) return { text: String(diff / 60), unit: 'min' }
  else if (diff < 86400) return { text: String(diff / (60 * 60)), unit: 'hour' }
  else return { 
    text: timestampToFormat({ ts: past, format: 'MM-DD' }),
    unit: 'date'
  }
}
