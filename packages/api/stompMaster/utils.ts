import { log } from '$lib/logStore'
import { subjects } from '$pages/matches/stores'
import type { createTimer } from '$lib/utils/countingTime'

import { rxStomp } from './init'
import { Path } from './constants'

import type { SubscriptionMap } from '$pages/matches/types'
import type { ILog } from '$lib/logStore'
import type { IStompCallback, IStompHeaders } from './types'

const updateReceivedTime = (iid: number, key: keyof SubscriptionMap ) => {
  const subscription = subjects.get(iid)?.[key]
  if (subscription) {
    subscription.lastReceived = Date.now()
  }
}

const oddsDiffLogFormat = (parsed: any): ILog => {
  const marketIsEmpty = !parsed.market || Object.keys(parsed.market).length === 0
  if (marketIsEmpty) return { event: 'marketIsEmpty', topic: 'oddsDiff',  msg: `init market is empty. ${JSON.stringify(parsed)}` }
  return { event: 'init', topic: 'oddsDiff', msg: JSON.stringify({
    ...parsed,
    market: {
      '1x2': parsed.market['1x2'],
      '1x2_1st': parsed.market['1x2_1st'],
      'ah': parsed.market.ah,
      'ah_1st': parsed.market.ah_1st,
      'ou': parsed.market.ou,
      'ou_1st': parsed.market.ou_1st
    }
  })}
}

export const subscribeOddsDiff = (iid: number, callback: IStompCallback) => {
  const subscription = rxStomp.watch(`${Path.oddsDiff}/${iid}`).subscribe((v) => {
    updateReceivedTime(Number(iid), 'oddsDiff')
    const parsed = JSON.parse(v.body)
    log('stomp', oddsDiffLogFormat(parsed))

    callback(parsed, { headers: { ...v.headers } as unknown as IStompHeaders })
  })

  return subscription
}

export const subscribeMatchInplay = (iid: number, callback: IStompCallback) => {
  const subscription = rxStomp.watch(`${Path.inplay}/${iid}`).subscribe((v) => {
    const parsed = JSON.parse(v.body)

    callback(parsed, { headers: { ...v.headers } as unknown as IStompHeaders })
  })

  return subscription
}

export const subscribeProfit = (iid: number, callback: IStompCallback) => {
  const subscription = rxStomp.watch(`${Path.profit}/${iid}`).subscribe((v) => {
    updateReceivedTime(Number(iid), 'profit')
    const parsed = JSON.parse(v.body)

    callback(parsed, { headers: { ...v.headers } as unknown as IStompHeaders })
  })

  return subscription
}

export const subscribeMatchProfitForecast = ({ sid, iid }: { sid: number, iid: number }, callback: IStompCallback) => {
  const subscription = rxStomp.watch(`${Path.matchProfitForecast}/${sid}/${iid}`).subscribe((v) => {
    updateReceivedTime(Number(iid), 'matchProfitForecast')
    const parsed = JSON.parse(v.body)

    callback(parsed, { headers: { ...v.headers } as unknown as IStompHeaders })
  })

  return subscription
}


const stopCountingPeriod = ['not_started', 'ht', 'pre_ot', 'otht', 'after_ot', 'pre_pk', 'ended', 'interrupted', 'abandoned']
export const needStopCounting = (period: string) => stopCountingPeriod.includes(period)
export const stopCounting = (timer?: ReturnType<typeof createTimer>) => {
  if (!timer) return
  if (timer.getStatus() === 'stop') return
  else if (timer.getStatus() === 'counting') timer.stop()
}

export const contiuneCounting = (timer?: ReturnType<typeof createTimer>) => {
  if (!timer) return
  if (timer.getStatus() === 'counting') return
  else if (timer.getStatus() === 'stop') timer.counting()
}
