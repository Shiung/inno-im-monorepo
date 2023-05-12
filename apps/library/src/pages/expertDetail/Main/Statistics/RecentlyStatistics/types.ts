import type { IExpertStatistics } from 'api/im/types'

type ArrayElement<T extends any[]> = T extends readonly (infer Element)[] ? Element : T

export type StatisticsInfo = ArrayElement<IExpertStatistics['res']['data']['info']>

export type StatisticsLists = IExpertStatistics['res']['data']['list']