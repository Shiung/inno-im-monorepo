<script lang="ts">
  import { fly } from 'svelte/transition'
  import { onDestroy } from 'svelte'

  import SoundOn from './images/sound_on.svg'
  import SoundOff from './images/sound_off.svg'
  import ZoomIn from './images/zoom_in.svg'
  import LivePlay from './images/LivePlay.svg'
  import LiveStop from './images/LiveStop.svg'

  export let showControls: boolean
  export let setMute = () => {}
  export let setPause = () => {}
  export let setFullScreen = () => {}

  export let paused: boolean
  export let muted: boolean

  let optionTimeout: ReturnType<typeof setTimeout>

  $: if (showControls) {
    optionTimeout = setTimeout(() => (showControls = false), 3000)
  }

  onDestroy(() => {
    clearTimeout(optionTimeout)
  })
</script>

{#if showControls}
  <div transition:fly class="absolute w-full h-full left-0 top-0 bg-black/10 z-10">
    <div class="flex justify-center items-center h-full">
      <div on:click={setPause} on:keypress>
        {#if paused}
          <LivePlay />
        {:else}
          <LiveStop />
        {/if}
      </div>
    </div>

    <div class="absolute bottom-2 left-2" on:click={setMute} on:keypress>
      {#if muted}
        <SoundOn />
      {:else}
        <SoundOff />
      {/if}
    </div>

    <div class="absolute bottom-2 right-2" on:click={setFullScreen} on:keypress>
      <ZoomIn />
    </div>
  </div>
{/if}
