<script lang="ts">
  import { push } from 'svelte-spa-router'
  import { bottomNav } from '$stores/layout'
  import Item from './Item.svelte'

  import type { IIcon } from 'ui/components/BottomNavigation/types'

  const list: IIcon[] = [
    {
      id: 'anchor',
      icon: () => import('./images/anchor.svg'),
      text: 'common.anchor',
      onClick: () => push('/anchor')
    },
    {
      id: 'expert',
      icon: () => import('./images/expert.svg'),
      text: 'common.expert',
      onClick: () => push('/expert')
    }
  ]
</script>

<div class="h-[62px] bg-white rounded-[10px] space-x-[16px] py-[12px] flex justify-center items-center">
  {#each list as item}
    <Item
      active={item.id === $bottomNav}
      icon={item.icon}
      text={String(item.text)}
      on:click={!item.disabled && item.onClick}
    />
  {/each}
</div>
