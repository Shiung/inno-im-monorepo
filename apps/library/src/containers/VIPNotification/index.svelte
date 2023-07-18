<script lang='ts'>
  // import { getLocalTimeDayjs, transformUTCTimeDayjs, getEndDateDayjs } from './utils/dayjsUtils'
  // import { dayjsUtils } from './utils'
  import { convertDateAndTimestamp } from 'utils'

  let open: boolean = false

  const diffTime: number = 0
  // const getExpired = localStorage.getItem('imVIPNotify')
  // console.log('aaa', Number(getExpired) * 1000)
  // const dayInst = dayjsUtils.transformUTCTime(Number(getExpired))
  // const endTimeStamp = dayjsUtils.getEndDate(dayInst).valueOf()
  // console.log('getExpired', getExpired, dayInst, dayInst.hour(), dayInst.date(), dayInst.month())
  // console.log('end', endTimeStamp, endTimeStamp + 30*1000,dayjsUtils, dayjsUtils.transformUTCTime(endTimeStamp + 30*1000))
  // console.log('')

  // console.log('local', dayjsUtils.getLocalTime().valueOf())
  // setTimeout(() => {
  //   open = true
  // }, 5000)

  const currentTime = convertDateAndTimestamp.getLocalTimestamp(60 * 60 * 1000)
  const GMT8 = convertDateAndTimestamp.transformUTCTime(currentTime, 8)
  const GMT4 = convertDateAndTimestamp.transformUTCTime(currentTime)
  console.log('aaa', currentTime)
  console.log('GMT8', GMT8, convertDateAndTimestamp.getEndDate(GMT8).valueOf())
  console.log('GMT4', GMT4, convertDateAndTimestamp.getEndDate(GMT4).valueOf())

  const setExpiredStore = (ts: number) => {
    localStorage.setItem('imVIPNotify', JSON.stringify(ts))
  }

  const checkExpired = () => {
    const expiredStorage = localStorage.getItem('imVIPNotify')
    const currentTime = convertDateAndTimestamp.getLocalTimestamp(diffTime)
    if (!expiredStorage || Number(expiredStorage) < currentTime) {
      console.log('set expire')
      const endTimets = convertDateAndTimestamp.getEndDate(convertDateAndTimestamp.transformUTCTime(currentTime)).valueOf()
      setExpiredStore(endTimets)
      open = true
    } else {
      console.log('do nothing')
      // removetExpiredStore()
    }
  }

  checkExpired()

</script>


{#if open}
  <div class='fixed w-[100px] h-[200px] bg-[#eee] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
    notification
  </div>
{/if}
