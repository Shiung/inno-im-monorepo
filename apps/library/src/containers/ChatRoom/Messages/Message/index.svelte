<script lang="ts">
import Others from './Others.svelte'
import Self from './Self.svelte'

import type { IChatMessage } from 'api/im/types'

export let message: IChatMessage
export let self: boolean

</script>

<svelte:component this={self ? Self : Others} message={message} />
