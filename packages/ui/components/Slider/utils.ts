export const isValidNumber = (value: string) => /^(?!-0?(\.0+)?$)-?(0|[1-9]\d*)?(\.\d+)?(?:\d)$/.test(value)

export const isPercentageValue = (value: string) => /^(?!-0?(\.0+)?%$)-?(0|[1-9]\d*)?(\.\d+)?(?:\d)%$/.test(value)

export const isPixelValue = (value: string) => /^(?!-0?(\.0+)?px$)-?(0|[1-9]\d*)?(\.\d+)?(?:\d)px$/.test(value)

export const getBoundingRect = (parent: HTMLDivElement, type: Exclude<keyof DOMRect, 'toJSON'>) => {
  return parent?.getBoundingClientRect()?.[type] || 0
}

export const calculate = (type: 'width' | 'height', value: string | number, parent?: HTMLDivElement) => {
  if(typeof value === 'number') return value

  let retWidth: number = 0
  if (isValidNumber(value)) {
    retWidth = parseFloat(value)
  } else if(isPercentageValue(value)) {
    const [percent] = value.split('%')
    const percentage = parseFloat(percent) / 100
    retWidth = getBoundingRect(parent, type) * percentage
  } else if (isPixelValue(value)) {
    const [number] = value.split('px')
    retWidth = parseFloat(number)
  } else {
    console.warn('invalid property!', value)
  }

  return retWidth
}

export const calDragDistance = (slideIdx: number, slideWidth: number, padding: number, container: HTMLDivElement) => {
  return -slideIdx * (slideWidth + padding) + Math.floor((getBoundingRect(container, 'width')  - slideWidth) / 2)
}

export const isOverThreshold = (dragDist: number, slideWidth: number, threshold: number) => {
  return Math.abs(dragDist) >= slideWidth * threshold
}

export const isOutsideBoundary = (x: number, container: HTMLDivElement) => {
  return x <= getBoundingRect(container, 'left') || x >= getBoundingRect(container, 'right')
}

export const isLastTwoElement = (idx: number, arrLength: number) => idx === arrLength - 2

export const isSecondElement = (idx: number) => idx === 1

export const getTouchClientX = (type: 'touchstart' | 'touchmove' | 'touchend', e: TouchEvent) => {
  switch(type) {
    case 'touchstart':
    case 'touchmove':
      return e?.touches?.[0]?.clientX || 0
    case 'touchend':
      return e?.changedTouches?.[0]?.clientX || 0
  }
}

export const createSlide = (data: any[], isSlides: boolean) => {
  if(!isSlides) return data
  return data.slice(-2).concat(data).concat(data.slice(0, 2))
}