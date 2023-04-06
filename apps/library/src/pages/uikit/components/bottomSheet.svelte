<script lang='ts'>
import Button from 'ui/components/Button'
import BottomSheet, { Header, Content, Footer } from 'ui/components/BottomSheet'

let open: boolean = true
</script>

<Button on:click={() => open = true}> open </Button>

<BottomSheet dragBar bind:open={open}
  initHeight={() => 600}
  maxHeight={(innerHeight) => innerHeight - 50}
  onDismiss={() => open = false}
>
  <Header title='title slot' class='bg-orange-600'>
    <button on:click={() => console.log('header left')}> this </button>
  </Header>

  <Content>
    {#each {length: 60} as _, idx}
      <div>
        content {idx}
      </div>
    {/each}
  </Content>

  <Footer>
    <Button on:click={() => open = false}> cancel </Button>
    <Button on:click={() => console.log('submit')}> submit </Button>
  </Footer>


</BottomSheet>

