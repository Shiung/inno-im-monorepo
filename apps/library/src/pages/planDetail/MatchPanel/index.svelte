<script lang="ts">
  import TeamLogo from '$src/components/TeamLogo'
  import { beImgUrlParse, ImageType } from 'utils/imgUrlParse'
  import { timestampToDateTime } from 'utils/convertDateAndTimestamp'
  import type { IArticleDetail } from 'api/im/types'

  export let data: IArticleDetail
</script>

<div data-cid='MatchPanel' class='bg-white px-3 pb-5'>
  <div class='relative z-[1] rounded-[10px] im-shadow py-2'>
      <div class='text-[12px] leading-[18px] text-[#333] mb-[10px] text-center'> {data?.tnName} </div>

      <div class='flex justify-around'>

        <div class='flex flex-col items-center space-y-[5px]'>
          <TeamLogo class='w-[30px] h-[30px]' src={beImgUrlParse({ id: data?.homeId, type: ImageType.competitors })} />
          <div class='text-[12px] leading-6 text-center'> {data?.homeName} </div>
        </div>

        <div>
          <div class='text-center text-[20px] leading-[30px] mb-[5px] text-[#333]'> VS </div>
          <div class='text-center text-[11px] leading-[17px] text-[#999]'> {timestampToDateTime(data?.matchTime)} </div>
        </div>

        <div class='flex flex-col items-center space-y-[5px]'>
          <TeamLogo class='w-[30px] h-[30px]' src={beImgUrlParse({ id: data?.awayId, type: ImageType.competitors })} />
          <div class='text-[12px] leading-6 text-center'> {data?.awayName} </div>
        </div>
        
      </div>
  </div>
</div>