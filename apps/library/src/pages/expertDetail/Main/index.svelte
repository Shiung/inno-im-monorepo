<script lang='ts'>
import { twMerge } from 'tailwind-merge'
import { params } from 'svelte-spa-router'

import Menu from './Menu.svelte'

const Plan = () => import('./Plan/index.svelte')
const Statistics = () => import('./Statistics/index.svelte')

let promise: ReturnType<typeof Plan | typeof Statistics>

const fetchComponent = (_method: string) => {

  switch (_method) {
    case 'plan': return promise = Plan()
    case 'statistics': return promise = Statistics()
  }
}

$: fetchComponent($params?.method)

</script>

<div class={twMerge('bg-[white] rounded-t-[20px]', $$props.class)}>
  <Menu class='mb-[16px]' />

  {#await promise then comp}
    <svelte:component this={comp?.default} />
  {/await}

</div>
