export type IExpertType = 0 | 1 | 2 // 0: 命中王 1: 連紅王 2: 跟投王

export interface IExpertMenu {
  i18n: string
  type: IExpertType
  onClick: () => void
}
