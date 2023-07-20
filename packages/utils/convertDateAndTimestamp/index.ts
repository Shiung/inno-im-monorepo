import type { ILanguages } from 'env-config'
import type { IDiffPast } from './types'
import dayjs, { type Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

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
  return timestamp
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

export const languagesToDateFormat = (lang: ILanguages, time: string) => {
  switch (lang) {
    case 'zh_CN':
      return dayjs(time).locale('zh-cn').format('DD-MM HH:mm')
    case 'en_US':
    case 'ms_MY':
    case 'id_ID':
    case 'vi_VN':
    case 'hi_IN':
    case 'th_TH':
      return dayjs(time).locale('en-us').format('DD MMM HH:mm')
    case 'ja_JP':
      return dayjs(time).locale('ja-jp').format('MM月DD日 HH:mm')
    case 'ko_KR':
      return dayjs(time).locale('ko-kr').format('MM달DD일 HH:mm')
    default:
      return dayjs(time).locale('en-us').format('DD MMM HH:mm')
  }
}

export const getLocalAlignTimestamp = (diff?: number) => diff ? Number(dayjs().valueOf()) + diff : dayjs().valueOf()

export const transformUTCTime = (ts: number, gmt: string | number = -4): Dayjs => dayjs(ts).utcOffset(gmt)

export const getEndDate = (d: Dayjs) => d.endOf('date')
