import type { StatisticsLists } from '../type'
import BigNumber from 'bignumber.js'
import type { ILineChartDataItem } from './components/LineChart/types'

export const calculateRecordData = (data: StatisticsLists): Array<ILineChartDataItem> => {
  let accumulates = []

  data
    .sort((a, b) => b.releaseTime - a.releaseTime)
    .forEach((item, i) => {
      const isHit = item.hitStatus === 1
      const prev = accumulates[i - 1]?.hit || 0
      const hit = isHit ? 1 + prev : prev
      const info = {
        day: i + 1,
        hit,
        total: i + 1,
        percent: parseFloat(new BigNumber(hit / (i + 1) * 100).toFormat(2))
      }
      accumulates.push(info)
    })

  return accumulates
    .filter(item => item.day === 2 || item.day === 3 || item.day === 5 || item.day === 7)
    .sort((a, b) => b.day - a.day)
}