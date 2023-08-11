<script lang="ts">
  import { params, replace } from 'svelte-spa-router'
  import Navigation, { Icon, LottieIcon } from '$containers/Navigation'

  import { soccer, basketball, tennis, baseball } from '$assets/sid'

  import { locale } from '$stores'

  import AnchorList from './AnchorList'
  import fireData from './lottie/fire_normal.json'

  import { convertSid } from 'utils'

  $: sid = convertSid($params?.anchorSid)
</script>

<div>
  <Navigation bind:active={sid} shape="circle" class="space-x-[10px]">
    <LottieIcon id={0} on:click={() => replace('/anchor/0')} src={JSON.stringify(fireData)} infinity />
    <Icon id={1} class="!ml-1" on:click={() => replace('/anchor/1')} src={soccer} />
    <Icon id={2} on:click={() => replace('/anchor/2')} src={basketball} />
    <Icon id={3} on:click={() => replace('/anchor/3')} src={tennis} />
  </Navigation>

  {#key $locale}
    <AnchorList />
  {/key}
</div>
