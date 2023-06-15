<script lang="ts">
  import { params } from 'svelte-spa-router'
  import ExpertArticle from '$src/containers/ExpertArticle/index.svelte'
  import type { IArticle } from 'api/im/types/expert'

  export let articles: IArticle[] = []
</script>

{#each articles as article}
  <ExpertArticle {article} class='mb-3' expertId={$params.expertId} />
{/each}