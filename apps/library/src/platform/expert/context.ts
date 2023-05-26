import { createStoreContext } from 'utils/storeContext'

interface IGoDetail {
  detailLocation: Function
}

export const initGoDetail: IGoDetail = {
  detailLocation: null
}

export const [setGoDetail, getGoDetail] = createStoreContext<IGoDetail>('expertDetail', initGoDetail)
