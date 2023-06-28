<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import Chatroom, {
    setChatEnv,
    setChatInfo,
    setChatUserInfo,
    onSizeChangedCallback,
    onToggledCallback,
    type SizeChangedOption
  } from '$src/containers/Chatroom'

  const isWindow: boolean = true
  let expandType: string = 'default'
  let dom: HTMLDivElement
  let changedHeight: number
  let videoPlay: boolean = false
  let isTransition: boolean = false

  $: initHeight = dom?.getBoundingClientRect().height

  $: changedHeight = initHeight

  $: if (dom) {
    setChatEnv({
      displayType: isWindow ? 'window' : 'block',
      height: initHeight,
      isOpen: false
    })

    setChatInfo({
      chatId: '1234',
      iid: 123456,
      vipLimit: 0,
      frequency: 0
    })

    setChatUserInfo({
      userAccount: 'bltest01',
      userToken:
        'eyJhbGciOiJIUzI1NiJ9.eyJzbXNPdHBNb2RlIjowLCJpcCI6IjYxLjIxNi45MC4xIiwicGxhdGZvcm1VdWlkIjoiZmJjZjIzNWQtNzFiZS00MDhhLWJjYzUtN2MxNjY3M2RjZTg5IiwidmVuZG9ySWQiOjEsInR5cGUiOjEsInVzZXJJZCI6MzA3Njg3LCJsb2dpbkRvbWFpbiI6ImVuLXZkMDAxLXRpZ2VyLXBvcnRhbC5pbm5vZGV2LnNpdGUiLCJsYXN0TG9naW5UaW1lIjoxNjg3ODU2NjkwMDAwLCJhcHBUeXBlIjoyLCJzaWduVXBUaW1lIjoxNjIxMTU0MDk2MDAwLCJ2ZW5kb3IiOiJkdjIiLCJjdXJyZW5jeSI6IkNOWSIsImxvZ2luUHJvdG9jb2wiOiJodHRwcyIsImRldmljZSI6Ik1PQklMRSIsImFjY291bnQiOiJibHRlc3QwMSJ9.2AKZUzjgNcD8Ywlak8WdbNInywd2LYNBHQ5CKc8i030',
      userVip: 10
    })
  }

  $: setChatEnv({ height: changedHeight, size: expandType as any })

  onSizeChangedCallback((option: SizeChangedOption) => {
    isTransition = option.transition

    switch (option.size) {
      case 'default':
        expandType = 'default'
        break
      case 'normal':
        expandType = 'normal'
        changedHeight = initHeight
        break
      case 'expand':
        if (videoPlay) return
        expandType = 'expand'
        changedHeight = 0
        break
    }
  })

  onToggledCallback((open) => {
    setChatEnv({ isOpen: open })
  })

  // setTimeout(() => {
  //   videoPlay = true
  // }, 3000)
</script>

<div>
  <div
    class={twMerge(
      'w-full bg-white h-[200px] duration-300',
      expandType !== 'default' && 'fixed z-30',
      isTransition ? 'transition-[height]' : 'transition-none'
    )}
    bind:this={dom}
    style:height={expandType !== 'default' ? `${changedHeight}px` : ''}
    style:overflow={!isWindow ? 'hidden' : ''}
  >
    this platform area
  </div>
  <div
    class={twMerge('duration-300', isTransition ? 'transition-[height]' : 'transition-none')}
    style:height={expandType !== 'default' ? `${changedHeight}px` : ''}
  />

  <div
    class={twMerge(
      'h-[2000px] bg-red-500',
      expandType !== 'default' ? 'fixed left-0 right-0' : 'static'
    )}
  />
</div>

<Chatroom />
