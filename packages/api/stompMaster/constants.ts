export enum Path {
  /*
   * #1.賽事賠率變更
   * topic/odds-diff/match/{iid}
   */
  oddsDiff = '/topic/odds-diff/match',
  /*
   * #2.賽事滾球資訊
   * topic/match/inplay/info/{iid}
   */
  inplay = '/topic/match/inplay/info',
  /*
   * #3.賽事盤口盈餘
   * /topic/match/profit/{iid}
   */
  profit = '/topic/match/profit',
  /*
   * #4.賽事狀態變更
   * /topic/match/event
   */
  event = '/topic/match/event',
  /*
   * #5.賽事損益預估
   * /topic/match/profit-forecast/{sid}/{iid}
   */
  matchProfitForecast = '/topic/match/profit-forecast'
}

export enum EventStatus {
  /* 賽事取消 */
  cancel = 1,
  /* 賽事延期 */
  postpone = 2,
  /* 賽事開賽 */
  start = 3,
  /* 賽事結束 */
  end = 4,
  /* 賽事(早盤)關閉 */
  earlyEnd = 5, 
  /* 賽事異常 */
  abnormal = 6,
  /* 賽事中止 */
  terminated = 7,
  /* 賽事重啟 */
  restart = 8
}
