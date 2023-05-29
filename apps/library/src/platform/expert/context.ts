import { createStoreContext } from 'utils/storeContext'

interface IGoDetail {
  goExpertDetailCallback: (path: string) => void
  goPlanDetailCallback: (path: string) => void
}

export const initGoDetail: IGoDetail = {
  goExpertDetailCallback: null,
  goPlanDetailCallback: null
}

export const [setGoDetail, getGoDetail] = createStoreContext<IGoDetail>('expertDetail', initGoDetail)
