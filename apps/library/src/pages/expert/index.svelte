<script lang="ts">
  import { params, replace } from 'svelte-spa-router'

  import Navigation, { Icon, LottieIcon } from '$containers/Navigation'

  import {
    soccer,
    basketball
    //  tennis, baseball
  } from '$assets/sid'

  import ExpertList from './List/index.svelte'

  import allSquare from './lottie/all_square_app.json'
  import FloatingKey from '$src/containers/FloatKey'

  import { locale } from '$stores'
  import { convertSid } from 'utils'

  $: sid = convertSid($params?.expertSid)
</script>

<div data-cid="Expert">
  <Navigation bind:active={sid} shape="circle" class="space-x-[10px]">
    <LottieIcon id={0} on:click={() => replace('/expert/0')} infinity src={JSON.stringify(allSquare)} />
    <Icon id={1} on:click={() => replace('/expert/1')} src={soccer} />
    <Icon id={2} on:click={() => replace('/expert/2')} src={basketball} />
  </Navigation>

  {#key $locale}
    <ExpertList {sid} />
  {/key}

  <FloatingKey />

</div>
