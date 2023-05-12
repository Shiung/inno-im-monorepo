import { timestampToFormat } from '../convertDateAndTimestamp'
import type { IDiffPast } from './types'

export const convertTimeDiffToPast = (props: { now: number, past: number }): IDiffPast => {
  const { now, past } = props
  const diff = now - past

  if (diff < 60 * 1000) return { text: String(Math.round(diff / 1000)), unit: 'sec' }
  else if (diff < 3600 * 1000) return { text: String(Math.round(diff / 60 / 1000)), unit: 'min' }
  else if (diff < 86400 * 1000) return { text: String(Math.round(diff / 60 / 60 / 1000)), unit: 'hour' }
  else return { 
    text: timestampToFormat({ ts: past, format: 'MM-DD' }),
    unit: 'date'
  }
}
