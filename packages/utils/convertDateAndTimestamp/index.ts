export const timestampToDatetime = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  const month = `0${date.getMonth() + 1}`
  const day = `0${date.getDate()}`
  const hours = `0${date.getHours()}`
  const minutes = `0${date.getMinutes()}`
  const formattedTime = `${month.slice(-2)}/${day.slice(-2)} ${hours.slice(-2)}:${minutes.slice(-2)}`
  return formattedTime
}

export const timestampToDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  const year = date.getFullYear()
  const month = `0${date.getMonth() + 1}`
  const day = `0${date.getDate()}`
  const formattedTime = `${year}-${month.slice(-2)}-${day.slice(-2)}`
  return formattedTime
}

export const dateTimeToTimestamp = (date: string) => {  
  const timestamp = new Date(date).getTime()
  return (timestamp / 1000)
}

export const getTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  const hours = `0${date.getHours()}`
  const minutes = `0${date.getMinutes()}`
  return `${hours.slice(-2)}:${minutes.slice(-2)}`
}
