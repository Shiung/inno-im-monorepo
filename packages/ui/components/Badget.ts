import { createBadget } from '../core/badget'

export default createBadget({
  primary: {
    className: '',
  },
  onLine: {
    className: 'inline-flex items-center bg-[#80B100] rounded-[5px] h-[20px] px-[9px]'
  },
  hot: {
    background: 'linear-gradient(to right, #F00, #FF0)'
  }
})
