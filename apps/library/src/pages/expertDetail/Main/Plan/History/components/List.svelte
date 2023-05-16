<script lang="ts">
  import Empty from '$src/containers/Empty'

  import ExpertArticle from '$src/components/ExpertArticle/index.svelte'

  import type { IArticle } from 'api/im/types/expert'

  export let articles: IArticle[] = []
</script>

{#if articles.length === 0}
  <Empty class='h-[300px]' />
{:else}
  {#each articles as article}
    <ExpertArticle {article} class='mb-3' />
  {/each}
{/if}