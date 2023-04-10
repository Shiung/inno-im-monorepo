<script lang='ts'>
import Item from './Item.svelte'
import hill from './images/iconSelect.png'

interface IIcons {
  icon: () => Promise<any>
  text: string | number
  onClick: () => void
}

export let icons: IIcons[]
export let ripple: boolean | string
export let active: string | number
export let color: string

</script>

<div>
  <img src={hill} alt='' />

  <div class='flex justify-around' style:box-shadow='0 0 10px 0 rgba(0,0,0,.1)'>
    {#each icons as item}
      <Item
        color={color}
        ripple={ripple}
        active={String(item.text) === String(active)}
        icon={item.icon} 
        text={String(item.text)}
        on:click={item.onClick}
      />
    {/each}
  </div>

</div>
