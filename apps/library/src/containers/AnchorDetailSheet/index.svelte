<script lang='ts'>
import { im } from 'api'
import { Ripple } from 'ui'
import BottomSheet, { Header, Content } from 'ui/components/BottomSheet'
import Close from './images/close.svg'

export let open: boolean
export let houseId: string

const detailPromise = im.webAnchorsDetail()

</script>

<BottomSheet
  dragBar
  open={open}
  initHeight={(height) => height * 3/4}
  maxHeight={(height) => height + 20}
>
  <Header class='mt-[5px] flex justify-between px-[15px]'>
    <div />
    <Ripple on:click={() => open = false}>
      <Close class='justify-self-end' width={20} height={20} fill='#666666' />
    </Ripple>
  </Header>

  <Content>

    {#await detailPromise}
      <div> loading </div>
    {:then detail}
      <div> {JSON.stringify(detail)} </div>
    {/await}

  </Content>
</BottomSheet>


