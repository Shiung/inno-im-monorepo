import type { IDiffPast } from './types'

export const timestampToDateTime = (timestamp: number): string => {
  const date = new Date(timestamp)
  const month = `0${date.getMonth() + 1}`
  const day = `0${date.getDate()}`
  const hours = `0${date.getHours()}`
  const minutes = `0${date.getMinutes()}`
  const formattedTime = `${month.slice(-2)}/${day.slice(-2)} ${hours.slice(-2)}:${minutes.slice(-2)}`
  return formattedTime
}

export const timestampToDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = `0${date.getMonth() + 1}`
  const day = `0${date.getDate()}`
  const formattedTime = `${year}-${month.slice(-2)}-${day.slice(-2)}`
  return formattedTime
}

export const timestampToFormat = (props: { ts: number, format?: string }): string => {
  const { ts, format = 'YYYY-MM-DD hh-mm-ss' } = props
  const date = new Date(ts)
  const year = date.getFullYear()
  const month = `0${date.getMonth() + 1}`.slice(-2)
  const day = `0${date.getDate()}`.slice(-2)
  const hours = `0${date.getHours()}`.slice(-2)
  const minutes = `0${date.getMinutes()}`.slice(-2)
  const seconds = `0${date.getSeconds()}`.slice(-2)
  
  let formatted = format
  formatted = formatted.replace('YYYY', String(year))
  formatted = formatted.replace('MM', month)
  formatted = formatted.replace('DD', day)
  formatted = formatted.replace('hh', hours)
  formatted = formatted.replace('mm', minutes)
  formatted = formatted.replace('ss', seconds)
  return formatted
}

export const dateTimeToTimestamp = (date: string): number | undefined => {  
  const timestamp = new Date(date).getTime()
  return timestamp || undefined
}

export const getTime = (timestamp: number): string => {
  const date = new Date(timestamp)
  if(isNaN(date.valueOf())) return ''

  const hours = `0${date.getHours()}`
  const minutes = `0${date.getMinutes()}`
  return `${hours.slice(-2)}:${minutes.slice(-2)}`
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