<script lang='ts'>
import { params } from 'svelte-spa-router'
import { im } from 'api'
import { locale, userAuth } from '$stores'

import Streak from '$containers/Streak'
import ExpertImage from '$src/components/ExpertImage'

import bg from './images/bg.webp'
import Loading from './Loading.svelte'

let infoPromise: ReturnType<typeof im.expertInfo>
let curExpertID: string = ''

$: curExpertID = $params?.expertId

$: if (curExpertID && $userAuth.userToken) {
  infoPromise = im.expertInfo({ query: {  expertId: curExpertID }, headers: { 'Accept-Language': $locale } })
}

</script>

<div class='flex h-[88px] bg-cover items-center px-[16px] bg-white rounded-b-[20px]'
  style:background-image={`url(${bg})`}
>
  {#await infoPromise}
    <Loading />
  {:then info}
    <ExpertImage class='w-[60px] h-[60px]' src={info?.data?.expertImage} />
    <div class='ml-[8px]'>
      <div class='text-[14px] font-semibold'> {info?.data?.expertName} </div>
      <Streak streak={info?.data?.hotStreak} />
    </div>

  {/await}
</div>
