import { createStoreContext } from 'utils/storeContext'

interface IGoDetail {
  goDetailCallback: (path: string) => void
}

export const initGoDetail: IGoDetail = {
  goDetailCallback: null
}

export const [setGoDetail, getGoDetail] = createStoreContext<IGoDetail>('expertDetail', initGoDetail)
