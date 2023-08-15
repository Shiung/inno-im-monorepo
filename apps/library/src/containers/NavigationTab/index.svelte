<script lang="ts">
  import { push } from 'svelte-spa-router'
  import { bottomNav } from '$stores/layout'
  import Item from './Item.svelte'
  import { Button } from 'ui'
  import Modal, { Header, Mark } from 'ui/components/Modal'
  import SunGlass from '../BottomNavigation/SunGlass.svelte'

  import { t } from '$stores'

  import type { IIcon } from 'ui/components/BottomNavigation/types'

  let showExpertModal: boolean = false

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
      component: {
        item: SunGlass,
        className: 'absolute top-0 right-[-0.25rem]'
      },
      text: 'common.expert',
      onClick: () => (showExpertModal = true)
    }
  ]
</script>

<div class="h-[62px] bg-white rounded-[10px] space-x-[16px] py-[12px] flex justify-center items-center">
  {#each list as item}
    <Item
      active={item.id === $bottomNav}
      icon={item.icon}
      text={String(item.text)}
      component={item.component}
      on:click={!item.disabled && item.onClick}
    />
  {/each}
</div>

<Modal bind:show={showExpertModal} closeOnDismiss>
  <Header variant="mark">{$t('common.prompt')}</Header>
  <Mark variant="info" />
  <pre class="text-[16px] text-imprimary text-center my-2">{$t('common.expertIsComing')}</pre>
  <Button class="w-full h-[56px] text-[16px] rounded-[10px]" on:click={() => (showExpertModal = false)}>{$t('common.confirm')}</Button>
</Modal>
