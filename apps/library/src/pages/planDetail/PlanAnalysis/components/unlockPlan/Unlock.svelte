<script lang="ts">
  import { t, locale, userKeyInfo, userAuth } from '$stores'

  import { Button } from 'ui'
  import Modal, { Header, Mark } from 'ui/components/Modal'

  import { params } from 'svelte-spa-router'
  import { im } from 'api'
  import { fetchUserKeyInfo } from '$api'

  import { getFetchArticleDetail } from '$pages/planDetail/context'

  let show = false

  const { fetchArticleDetail } = getFetchArticleDetail()
  
  const handleUnlock = async (token: string) => {
    show = false

    if (!token) return

    try {
      const res = await im.expertArticleUnlock({ body: { articleId: $params.articleId } })
      if (res?.data?.articleStatus === 1) {
        $fetchArticleDetail({
          articleId: $params?.articleId,
          lang: $locale,
          token: $userAuth.userToken
        })
        fetchUserKeyInfo(token)
      }
    } catch (error) {
      console.error(error)
    }
  }
</script>
<div>
  <Button class="w-full min-h-[56px] rounded-[12px] text-sm" on:click={() => (show = true)}>
    {$t('expert.unlockPlan')}
  </Button>
  <Modal bind:show on:dismiss={(node) => console.log('modal outside clicked', node)}>
    <Mark variant="info" />
    <Header variant="mark" class="mb-3">{$t('common.prompt')}</Header>
    <p class="text-[rgb(var(--im-monorepo-primary))]">{$t('expert.keyDeduct')}</p>
    <p class="text-[rgb(var(--im-monorepo-primary))] mb-3">({`${$userKeyInfo.remainCount}/${$userKeyInfo.totalCount}`})</p>
    <div class="flex flex-col w-full">
      <Button class="h-[56px] mb-3" on:click={() => handleUnlock($userAuth.userToken)}>{$t('common.confirm')}</Button>
      <Button class="h-[56px]" variant="outline" on:click={() => (show = false)}>{$t('common.cancel')}</Button>
    </div>
  </Modal>
</div>
