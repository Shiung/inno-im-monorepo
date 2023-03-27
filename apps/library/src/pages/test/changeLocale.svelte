<script lang='ts'>
import { Button } from 'ui'
import { locale } from '$stores'
</script>

<div> changeLocale </div>

<Button on:click={() => locale.set('zh_CN')}> zh_CN </Button>
<Button on:click={() => locale.set('en_US')}> en_US </Button>
