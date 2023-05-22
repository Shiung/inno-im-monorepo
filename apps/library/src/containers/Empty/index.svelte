<script lang='ts'>
import { Empty } from 'ui'
import { t } from '$stores'

export let title: string = $t('common.empty')
</script>

<Empty title={title} class={$$props.class} />
