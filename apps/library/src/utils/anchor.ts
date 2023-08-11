import type { IWebAnchorMatch } from 'api/im/types'
import { get } from 'svelte/store'
import { goDetailCallback } from '$stores'
import { goSportDetailHOF } from '$src/utils/match'
import { push } from 'svelte-spa-router'

export const navigationAnchor = (isMatchType: boolean, match: IWebAnchorMatch, houseId: string) => {
  if(isMatchType) {
    if (match) goSportDetailHOF(match, get(goDetailCallback))
  } else {
    push(`/anchorChat/${houseId}`)
  }
}