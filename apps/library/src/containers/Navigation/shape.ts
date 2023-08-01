import type { INavigation } from './context'

export const rounded = {
  className: 'w-[35px] h-[35px] rounded-[10px]',
  active: 'bg-imprimary'
}
export const circle = {
  className: 'w-[30px] h-[30px] im-shadow rounded-full border',
  active: 'border-imprimary'
}

export const getShapeClassName = (shape: INavigation['shape']): { className: string, active: string } => {
  switch (shape) {
    case 'rounded': return rounded
    case 'circle': return circle
    default: return rounded
  }
}
