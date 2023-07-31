<script context="module" lang="ts">
  export const dataCid = 'BottomNavigation'
</script>

<script lang="ts">
  import { BottomNavigation, Button } from 'ui'
  import Modal, { Header, Mark } from 'ui/components/Modal'
  import { push } from 'svelte-spa-router'
  import { t, type ITransStore } from '$stores'
  import { bottomNav } from '$stores/layout'

  import SunGlass from './SunGlass.svelte'

  export let goHome: () => void = () => {}

  let showExpertModal: boolean = false

  let genIcons = (_t: ITransStore) => [
    {
      id: 'home',
      icon: () => import('./images/home.svg'),
      text: _t('common.backToHome'),
      onClick: goHome
    },
    {
      id: 'square',
      icon: () => import('./images/square.svg'),
      text: _t('common.square'),
      onClick: () => push('/square')
    },
    {
      id: 'anchor',
      icon: () => import('./images/anchor.svg'),
      text: _t('common.anchor'),
      onClick: () => push('/anchor')
    },
    {
      id: 'expert',
      icon: () => import('./images/expert.svg'),
      // 因GDIM-173 先硬寫
      component: {
        item: SunGlass,
        className: 'absolute top-1 translate-x-[12px]'
      },
      text: _t('common.expert'),
      onClick: () => (showExpertModal = true)
    }
  ]

  $: icons = genIcons($t)
</script>

<BottomNavigation {dataCid} {icons} active={$bottomNav} color="rgb(var(--im-monorepo-primary))" ripple="rgb(var(--im-monorepo-primary))" />

<Modal bind:show={showExpertModal} closeOnDismiss>
  <Header variant="mark">{$t('common.prompt')}</Header>
  <Mark variant="info" />
  <pre class="text-[16px] text-imprimary text-center my-2">{$t('common.expertIsComing')}</pre>
  <Button class="w-full h-[56px] text-[16px] rounded-[10px]" on:click={() => (showExpertModal = false)}>{$t('common.confirm')}</Button>
</Modal>
