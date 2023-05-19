import { createBadget } from '../core/badget'

export default createBadget({
  primary: {
    className: 'text-[10px] h-[15px] rounded-[4px]',
  },
  onLine: {
    className: 'inline-flex items-center bg-[#80B100] rounded-[5px] h-[20px] px-[9px]'
  },
  hot: {
    className: 'font-semibold text-[10px] h-[15px] rounded-[4px] bg-[#ECE9EA] text-[#F03131]',
  },
  mega: {
    className: 'font-semibold text-[10px] h-[15px] rounded-[4px] bg-[#F03131] text-white'
  },
  crazy: {
    className: 'font-semibold text-[10px] h-[15px] rounded-[4px] text-white',
    background: 'linear-gradient(to right, #F58918, #F03131)'
  },
  gradientPrimary: {
    className: 'text-[10px] h-4 text-[white] rounded-[4px] flex',
    background: 'linear-gradient(90deg, rgb(var(--im-monorepo-primary)) 0%, #50BDFF 100%)'
  },
})
