<script lang='ts'>
import { im } from 'api'
import { Ripple } from 'ui'
import BottomSheet, { Header, Content } from 'ui/components/BottomSheet'

import DetailHeader from './Header.svelte'

import Loading from './Loading.svelte'
import Close from './images/close.svg'


import type { withData, IWebAnchorDetail } from 'api/im/types'

export let open: boolean
export let houseId: string

const tabs = [ 'anchor.matches', 'anchor.personal', 'anchor.life' ]
let activedTab: typeof tabs[number] = 'anchor.matches'
$: console.log(activedTab)

let detailPromise: Promise<withData<IWebAnchorDetail>>

$: if (open) detailPromise = im.webAnchorsDetail({ query: { houseId }})

</script>

<BottomSheet
  dragBar
  open={open}
  initHeight={(height) => height * 3/4}
  maxHeight={(height) => height + 20}
>
  <Header class='mt-[5px] bg-white px-[15px]'>
    <div class='flex justify-between'>
      <div />
      <Ripple on:click={() => open = false}>
        <Close width={20} height={20} fill='#666666' />
      </Ripple>
    </div>
  </Header>

  {#await detailPromise}
    <Loading />

  {:then detail}

    <DetailHeader detail={detail.data} bind:activedTab={activedTab} tabs={tabs} />

    <Content>
      <div> {JSON.stringify(detail)} </div>
      <div> {JSON.stringify(detail)} </div>
      <div> {JSON.stringify(detail)} </div>
      <div> {JSON.stringify(detail)} </div>
      <div> {JSON.stringify(detail)} </div>
      <div> {JSON.stringify(detail)} </div>
    </Content>

  {/await}

</BottomSheet>


