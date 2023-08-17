<script lang="ts" context="module">
  import { writable } from 'svelte/store'
  import type { GoToExpertDetail, GoToPlanDetail } from '$containers/Expert/type'

  let matchInfo = writable(null)
  export const setMatchInfo = ({ mid, vd }) => {
    if (typeof mid !== 'number' || typeof vd !== 'string') return console.warn('mid, vd parameters MUST be type of number, string')

    matchInfo.set({ mid, vd })
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
  import { locale } from '$stores'
  import { onDestroy } from 'svelte'

  onDestroy(() => {
    matchInfo.set(null)
    goToExpertDetail.set(null)
    goToPlanDetail.set(null)
  })
</script>

<main class='im-library'>
  {#key $locale}
    <ExpertList mid={$matchInfo?.mid} vd={$matchInfo?.vd} goToPlanDetail={$goToPlanDetail} goToExpertDetail={$goToExpertDetail} />
  {/key}
</main>

