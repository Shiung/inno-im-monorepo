import { createModal, createHeader, createItem } from '../../core/modal'
import info from './info.svg'

export const Modal = createModal({
  primary: {
    className: 'bg-white w-[315px] flex flex-col items-center rounded-[10px] px-[10px] py-[12px]'
  },
  clean: {}
})

export const Header = createHeader({
  primary: {
    className: 'text-[#333333] font-semibold text-center text-[18px]'
  },
  mark: {
    className: 'text-[#333333] font-semibold text-center text-[18px] mt-[30px]'
  },
  clean: {}
})

export const Mark = createItem({
  info: {
    component: info,
    className: 'absolute top-[-20px] bg-white rounded-full'
  }
})

export default Modal
