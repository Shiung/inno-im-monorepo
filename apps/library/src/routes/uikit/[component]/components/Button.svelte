<script lang='ts'>
import { Button } from 'ui'
</script>

<Button on:click={() => console.log('primary clicked')}> primary </Button>
<Button loading > for testing </Button>
<Button disabled> disabled </Button>
<Button variant='outline' on:click={() => console.log('outline clicked')}> outline </Button>

