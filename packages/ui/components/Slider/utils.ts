export const isValidNumber = (value: string): boolean => /^(?!-0?(\.0+)?$)-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/.test(value)

export const isPercentageValue = (value: string): boolean => /^(?!-0?(\.0+)?%$)-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)%$/.test(value)

export const isPixelValue = (value: string): boolean => /^(?!-0?(\.0+)?px$)-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)px$/.test(value)

export const getElementSize = (parent: HTMLDivElement, type: 'width' | 'height') => {
  return parent?.getBoundingClientRect()?.[type] || 0
}
export const calculate = (type: 'width' | 'height', value: string | number, parent?: HTMLDivElement): number => {
  if(typeof value === 'number') return value

  let retWidth: number = 0
  if (isValidNumber(value)) {
    retWidth = parseFloat(value)
  } else if(isPercentageValue(value)) {
    const [percent] = value.split('%')
    const percentage = parseFloat(percent) / 100
    retWidth = getElementSize(parent, type) * percentage
  } else if (isPixelValue(value)) {
    const [number] = value.split('px')
    retWidth = parseFloat(number)
  } else {
    console.warn('invalid property!', value)
  }

  return retWidth
}