<script lang="ts">
  import { imgHeightRatio } from '$containers/AnchorHouseImage/config'
  import ChatRoomLoading from '$containers/Chatroom/Loading.svelte'
</script>

<div class="flex flex-col h-screen">
  <div class="w-full h-[44px] p-[5px]">
    <div class="w-1/3 h-full rounded-[10px] mx-auto animate-pulse bg-[#999]" />
  </div>

  <div class="animate-pulse bg-[#999]" style:height={`${imgHeightRatio()}px`} />

  <div class="flex-1 pt-[20px] bg-white">
    <ChatRoomLoading />
  </div>
</div>
