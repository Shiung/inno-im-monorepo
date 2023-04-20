const tabs = [
  'anchor.matches',
  'anchor.personal',
  'anchor.life',
] as const

export type IKeysOfTab = typeof tabs[number]

export type ITabs = {
  [key in IKeysOfTab]: () => Promise<any>
}
