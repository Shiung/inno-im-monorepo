import { createButton } from '../core/button'

const Button = createButton({
  primary: {
  },
  outline: {
    className: 'border border-[#EEEEEE] bg-white text-[#999999] hover:bg-white',
    ripple: '#333333'
  },
  icon: {
    className: 'm-[0px] p-[0px] w-[20px] h-[20px]',
  },
  ripple: {
    className: 'm-[0px] p-[0px] w-[20px] h-[20px] rounded-[0px] bg-transparent hover:bg-transparent',
    ripple: '#333333'
  },
})

export default Button
