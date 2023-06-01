import { createStoreContext } from 'utils/storeContext'

export interface IGoToDetail {
  goToExpertDetailCallback: (path: string) => void
  goToPlanDetailCallback: (path: string) => void
}

export const initGoToDetail: IGoToDetail = {
  goToExpertDetailCallback: null,
  goToPlanDetailCallback: null
}

export const [setGoToDetail, getGoToDetail] = createStoreContext<IGoToDetail>('expertDetail', initGoToDetail)
