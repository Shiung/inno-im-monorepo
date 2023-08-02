<script lang="ts">
  import { Button } from 'ui'
  import { t } from '$stores'
  import { twMerge } from 'tailwind-merge'

  import Lock from '$assets/lock.svg'

  export let onButtonClick: () => void = () => {}
  export let variant = 'outline'

  $: isOutline = variant === 'outline'
  $: fill = isOutline ? 'rgb(var(--im-monorepo-primary))' : 'white'
</script>

<Button
  data-cid="UnlockButton"
  class={twMerge(
    'px-2',
    $$props.class,
    isOutline && 'border-[rgb(var(--im-monorepo-primary))] text-[rgb(var(--im-monorepo-primary))] im-shadow'
  )}
  {variant}
  on:click={onButtonClick}
>
  <div class="space-y-1">
    <div class="flex items-center space-x-1">
      <Lock class="white-lock mr-1" width={16} height={13} {fill} />
      <slot>{$t('expert.planDetail.unlockPrediction')}</slot>
    </div>
  </div>
</Button>
