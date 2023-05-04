<script lang='ts'>
import { im } from 'api'

import Title from '../../components/Title.svelte'

export let expertId: string
const promise = im.expertArticleNow({ query: { expertId }})
</script>

<div>
  History
</div>
