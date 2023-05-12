export const timestampToDatetime = (timestamp: number) => {
  const date = new Date(timestamp)
  const month = `0${date.getMonth() + 1}`
  const day = `0${date.getDate()}`
  const hours = `0${date.getHours()}`
  const minutes = `0${date.getMinutes()}`
  const formattedTime = `${month.slice(-2)}/${day.slice(-2)} ${hours.slice(-2)}:${minutes.slice(-2)}`
  return formattedTime
}

export const timestampToDate = (timestamp: number) => {
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

export const dateTimeToTimestamp = (date: string) => {  
  const timestamp = new Date(date).getTime()
  return timestamp
}

export const getTime = (timestamp: number) => {
  const date = new Date(timestamp)
  const hours = `0${date.getHours()}`
  const minutes = `0${date.getMinutes()}`
  return `${hours.slice(-2)}:${minutes.slice(-2)}`
}
