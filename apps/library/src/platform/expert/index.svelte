<script lang="ts" context="module">
  import { writable } from 'svelte/store'
  import type { GoToExpertDetail, GoToPlanDetail } from '$containers/Expert/type'

  let sid = writable(null)
  export const setSid = (sidValue: number) => {
    if (typeof sidValue !== 'number') return console.warn('setSid parameter MUST be type of number')

    sid.set(sidValue)
  }

  let goToExpertDetail = writable<GoToExpertDetail>(null)
  export const setGoToExpertDetail = (callback: GoToExpertDetail) =>
    goToExpertDetail.update((_) => callback)

  let goToPlanDetail = writable<GoToPlanDetail>(null)
  export const setGoToPlanDetail = (callback: GoToPlanDetail) =>
    goToPlanDetail.update((_) => callback)
</script>

<script lang="ts">
  import ExpertList from './List/index.svelte'
</script>

<ExpertList sid={$sid} goToPlanDetail={$goToPlanDetail} goToExpertDetail={$goToExpertDetail} />

