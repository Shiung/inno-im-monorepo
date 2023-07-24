<script lang="ts">
  import { Button } from 'ui'
  import Modal, { Header, Mark } from 'ui/components/Modal'

  import group from './group.webp'
  let show = false
  let shake = false

  let show2 = false

  let show3 = false
</script>

<Button on:click={() => (show = true)}>show</Button>

<Modal bind:show bind:shake on:dismiss={(node) => console.log('modal outside clicked', node)}>
  <Mark variant="info" />
  <Header variant="mark">this is primary header</Header>
  <div>
    <Button on:click={() => (show2 = true)}>open2</Button>
    <Button on:click={() => (show = false)}>close</Button>
    <Button on:click={() => (shake = true)}>shake</Button>
  </div>
</Modal>

<Modal bind:show={show2} class="h-[500px]" closeOnDismiss>
  <Header>this is header 2</Header>
  <Button on:click={() => (show3 = true)}>open3</Button>
  <Button on:click={() => (show2 = false)}>close2</Button>
</Modal>

<Modal variant="clean" bind:show={show3}>
  <img class="w-[168px]" src={group} alt="" />
  <Header>this is header 3</Header>
  <Button on:click={() => (show3 = false)}>close3</Button>
</Modal>
