import { locale, setUserAuth, setUserInfo, setGoHome, setGoLogin, setGoVipCenter } from '$stores'

const setImStore = {
  // 三方 設定im語系
  locale: locale.set,
  // 三方 設定用戶資訊
  user: {
    auth: setUserAuth,
    info: setUserInfo
  },
  // 三方 設定轉導
  navigation: {
    goHome: setGoHome,
    goLogin: setGoLogin,
    goVipCenter: setGoVipCenter
  }
}

// 暴露三方設定 global store
export default setImStore
