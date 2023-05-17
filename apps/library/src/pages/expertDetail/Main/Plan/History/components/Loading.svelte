<script lang="ts">
  import { Loading } from '$src/containers/ExpertArticle'
</script>
<div class='space-y-[12px]'>
  {#each { length: 5 } as _ }
    <Loading />
  {/each}
</div>