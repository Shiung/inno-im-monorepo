<script lang='ts'>
import { twMerge } from 'tailwind-merge'
import { Ripple } from 'ui'
import { Header } from 'ui/components/BottomSheet'
import { t } from '$stores'

import anchorBg from './images/anchorBg.webp'
import mask from './images/mask.webp'

import type { IWebAnchorDetail } from 'api/im/types'
export let detail: IWebAnchorDetail['res']['data']

export let activedTab: typeof tabs[number]
export let tabs: string[]

</script>

<Header class='mt-[5px] bg-white px-[15px]'>
  <div class='flex justify-center'>
    <div class='relative flex justify-center w-[375px] h-[193px] bg-cover bg-center bg-no-repeat'
      style:background-image={`url(${anchorBg})`}
    >
      <img class='rounded-full mt-[12px] ml-[6px] w-[160px] h-[160px]' src={detail.userImage} alt='' />
      <img class='absolute top-[14px] w-[160px] h-[160px]' src={mask} alt='' />

      <!-- 主播標籤 (缺欄位)
      <div class='flex items-center absolute h-[26px] bottom-[5px] text-white
        bg-imprimary font-semibold text-[14px] rounded-[14px] px-[10px]'
      >
        {detail.nickName}
      </div>
      -->
    </div>
  </div>

  <div class='font-semibold text-[20px] w-full text-center'>
    {detail.nickName}
  </div>

  <div class='text-[14px] mt-[4px] text-[#999999] text-center'>
    {detail.personalIntroduction}
  </div>

  <div class='flex justify-around text-[14px] mt-[14px] mb-[15px] duration-300'>
    {#each tabs as tab}
      <div class='flex items-center duration-300 rounded-[20px]'
        style:background-color={activedTab === tab ? 'rgb(var(--im-monorepo-primary))' : 'white'}
      >
        <Ripple 
          class={twMerge('text-[#333333] h-[32px] px-[20px]',
            activedTab === tab && 'text-white'
          )}
          ripple='#ffffff'
          on:click={() => activedTab = tab}
        >
          {$t(tab)} 
        </Ripple>
      </div>
    {/each}
  </div>

</Header>
