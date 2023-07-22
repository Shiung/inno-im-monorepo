<script lang="ts">
  import { userKeyInfo } from '$stores/user'
  import type { IUserKeyInfo } from 'api/im/types'

  const Unlock = () => import('./Unlock.svelte')
  const UpgradeVip = () => import('./UpgradeVip.svelte')
  const GetKey = () => import('./GetKey.svelte')

  let promise: ReturnType<typeof Unlock | typeof UpgradeVip | typeof GetKey>

  const fetchComponent = (keyInfo: IUserKeyInfo['res']['data']) => {
    const { remainCount, keyCdList, totalCount } = keyInfo
    const unredeemedQuantity = totalCount - (remainCount + keyCdList.length)

    // 使用者身上有鑰匙可進行解鎖
    if (remainCount > 0) return (promise = Unlock())

    // 使用者身上沒鑰匙，VIP中心有鑰匙可領取
    if (remainCount === 0 && unredeemedQuantity > 0) return (promise = GetKey())

    // 使用者身上沒鑰匙，VIP中心沒鑰匙可領取
    if (remainCount === 0 && unredeemedQuantity === 0) return (promise = UpgradeVip())
  }

  $: if ($userKeyInfo) fetchComponent($userKeyInfo)

</script>

{#await promise then comp}
  <svelte:component this={comp?.default} />
{/await}
