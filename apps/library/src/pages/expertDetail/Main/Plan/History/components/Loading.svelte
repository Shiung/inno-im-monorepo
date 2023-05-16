<script lang="ts">
  import { Loading } from '$src/components/ExpertArticle'
</script>
<div class='space-y-[12px]'>
  {#each { length: 5 } as _ }
    <Loading />
  {/each}
</div>