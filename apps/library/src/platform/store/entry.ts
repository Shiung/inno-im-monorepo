import {
  locale,
  setUserAuth,
  setUserInfo,
  setGoHome,
  setGoLogin,
  setGoVipCenter,
  setGoDetail,
  setGoDeposit,
  initChatroomTranslationApi
} from '$stores'
import { regWindowSizeListener } from '$src/utils/listener'

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
    goVipCenter: setGoVipCenter,
    goSportDetail: setGoDetail,
    goDeposit: setGoDeposit
  },
  regWindowSizeListener: regWindowSizeListener,
  initChatroomTranslationApi: initChatroomTranslationApi
}

// 暴露三方設定 global store
export default setImStore
