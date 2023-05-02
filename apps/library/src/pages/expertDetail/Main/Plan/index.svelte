<script lang='ts'>
import { params } from 'svelte-spa-router'
import { im } from 'api'
console.log('plan component')

im.expertArticleNow({ query: { expertId: $params.expertId }})
</script>

<div>  plan </div>
