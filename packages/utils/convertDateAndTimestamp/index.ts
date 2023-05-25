import type { IDiffPast } from './types'
import dayjs from 'dayjs'

export const timestampToFormat = (props: { ts: number, format?: string }): string => {
  const { ts, format = 'YYYY-MM-DD hh-mm-ss' } = props
  return dayjs(ts).format(format)
}

export const timestampToDateTime = (timestamp: number): string => {
  return timestampToFormat({ ts: timestamp, format: 'MM/DD hh:mm' })
}

export const timestampToDate = (timestamp: number): string => {
  return timestampToFormat({ ts: timestamp, format: 'YYYY-MM-DD' })
}

export const getTime = (timestamp: number): string => {
  return timestampToFormat({ ts: timestamp, format: 'hh:mm' })
}

export const dateTimeToTimestamp = (date: string): number | undefined => {  
  const timestamp = new Date(date).getTime()
  return timestamp || undefined
}

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