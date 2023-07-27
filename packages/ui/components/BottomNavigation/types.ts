import type { SvelteComponent } from 'svelte'

export interface IIcon {
  id: string
  icon: () => Promise<any>
  // GDIM-173需求 先硬加
  component?: {
    item: any
    className: string
  }
  text: string | number
  disabled?: boolean
  onClick: () => void
}
