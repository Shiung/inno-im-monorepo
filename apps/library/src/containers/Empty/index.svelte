<script lang='ts'>
import { Empty } from 'ui'
import { t } from '$stores'

export let title: string = ''
</script>

<Empty title={title || $t('common.empty')} class={$$props.class} />
