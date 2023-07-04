import type { IParseMarketName, IFormat, ITransBetOn, IballType } from '../types'

const SID = {
  1: 'football',
  2: 'basketball',
  3: 'tennis',
  4: 'baseball'
}

const format = ({ title, k, homeName, awayName, withCondition }: IFormat) => {
  if (title.includes('%home%')) title = title.replace(/%home%/g, homeName)
  if (title.includes('%away%')) title = title.replace(/%away%/g, awayName)

  if (title.includes('%k%')) title = title.replace(/%k%/g, k)
  else if (withCondition) title = `${title} ${k}`

  return title
}

export const transBetOn = ({ info, _betOn, withCondition, betOn }: ITransBetOn) => {
  const { k, homeName, awayName } = info
  const betTarget = _betOn.find((item) => item.key === betOn)?.display
  return format({ title: betTarget ?? '', k, homeName, awayName, withCondition })
}

/**
 * 任何異動，平台，球板，聊天室需同步更新
 *
 * 取得marketTitle和所下注項目的名稱
 * marketTitle: '總分:大/小-下半場'
 * betOnName: '大 89.5'
 * @param params
 * @returns names
 */
const parseMarketName = ({ info, sportMarketSummary }: IParseMarketName) => {
  const { sid, k, market, betOn, homeName, awayName, outright } = info
  const ballType: IballType = SID[sid]

  if (outright)
    return {
      marketTitle: market,
      ...(betOn && { betOnName: betOn })
    }

  const noExistData =
    Object.keys(sportMarketSummary?.[ballType] ?? {}).length === 0 ||
    !sportMarketSummary[ballType][market]

  if (noExistData) return { marketTitle: market, betOnName: betOn }

  const { withCondition, betOn: _betOn, name } = sportMarketSummary[ballType][market]

  return {
    marketTitle: format({ title: name, k, homeName, awayName, withCondition: false }),
    ...(betOn && { betOnName: transBetOn({ info, _betOn, withCondition, betOn }) })
  }
}

export default parseMarketName
