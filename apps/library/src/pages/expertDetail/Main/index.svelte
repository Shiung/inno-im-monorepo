<script lang='ts'>
import { twMerge } from 'tailwind-merge'

import Info from '../Info/index.svelte'
import Menu from './Menu.svelte'

const Plan = () => import('./Plan/index.svelte')
const Statistics = () => import('./Statistics/index.svelte')

let method: 'plan' | 'statistics'
let promise: ReturnType<typeof Plan>

const fetchComponent = (_method: typeof method) => {
  switch (_method) {
    case 'plan': return promise = Plan()
    case 'statistics': return promise = Statistics()
  }
}

$: fetchComponent(method)

</script>

<Info />

<div class={twMerge('bg-[white] rounded-t-[20px]', $$props.class)}>
  <Menu class='mb-[16px]' bind:method={method} />

  {#await promise then comp}
    <svelte:component this={comp?.default} />
  {/await}

</div>
