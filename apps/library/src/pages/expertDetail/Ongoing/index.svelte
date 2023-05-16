<script lang="ts">
  import Info from '../Info/index.svelte'
  import ArticleStoryLoading from './components/ArticleStory/components/Loading/index.svelte'
  import ArticleStory from './components/ArticleStory/index.svelte'
  import { params } from 'svelte-spa-router'
  import { im } from 'api'

  const fetchData = async (articleId: string) => {
    if(!articleId) return
    return im.expertArticleDetail({ query: { articleId }})
  }

  $: promise = fetchData($params?.articleId)
  $: console.log('promise', promise)
</script>

<div>
  {#await promise}
    <ArticleStoryLoading />
  {:then detail}
    <ArticleStory data={detail.data} />
  {/await}
  <Info />
</div>