import { locale, setUserAuth, setUserInfo, setGoDetail } from '$stores'

const setImStore = {
  // 三方 設定im語系
  locale: locale.set,
  // 三方 設定用戶資訊
  user: {
    auth: setUserAuth,
    info: setUserInfo
  },
  navigation: {
    goSportDetail: setGoDetail
  }
}

// 暴露三方設定 global store
export default setImStore
