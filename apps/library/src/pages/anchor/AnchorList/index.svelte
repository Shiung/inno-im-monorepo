<script lang='ts'>
import { params } from 'svelte-spa-router'
import Loading from './Loading.svelte'
import Anchor from './Anchor/index.svelte'
import Search from './Search/index.svelte'

import { im } from 'api'

import bg0 from '../images/bg_style2_0.webp'
import bg1 from '../images/bg_style2_1.webp'
import bg2 from '../images/bg_style2_2.webp'
import bg3 from '../images/bg_style2_3.webp'

let fetchAnchorsPromise = im.webAnchors()
const anchorBgs = [ bg0, bg1, bg2, bg3 ]

$: {
  if ($params?.sid) fetchAnchorsPromise = im.webAnchors()
}

</script>

<div data-cid='Anchor_AnchorList' class='bg-white mt-[8px] rouned-[20px] py-[8px] px-[12px]'>
<Search on:clear={() => console.log('clear')}/>

  <div class='space-y-[12px]'>
    {#await fetchAnchorsPromise}
      <Loading />

    {:then anchors}

      {#each anchors?.data?.list as anchor, idx}
        <Anchor anchor={anchor} bg={anchorBgs[idx % anchorBgs.length]} />
      {/each}

    {/await}  
  </div>

</div>

