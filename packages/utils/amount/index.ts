import BigNumber from 'bignumber.js'

interface ITransformerOption {
	decimal: number
	roundMode?: BigNumber.RoundingMode
	format?: BigNumber.Format
}

export const amountThousandthTransformer = (
	amount: string | number | BigNumber.Instance,
	options: ITransformerOption = {
		decimal: 0
	}
): string => {
	const { decimal = 0, roundMode = BigNumber.ROUND_HALF_UP, format } = options
	const valBigNumber = new BigNumber(amount)
	if (valBigNumber.isNaN()) return ''

	const value = valBigNumber.toFormat(decimal, roundMode, format)
	return value
}

export const amountSymbolTransformer = (
	amount: string | number | BigNumber.Instance,
  options?: { decimalPoint?: number, roundingMode?: BigNumber.RoundingMode }
): string => {
  const decimalPoint = options?.decimalPoint || 0
  const roundingMode = options?.roundingMode || BigNumber.ROUND_HALF_UP
	const valBigNumber = new BigNumber(amount)
	if (valBigNumber.isNaN()) return ''

	const sign = valBigNumber.isNegative() ? '-' : ''
	const absValue = valBigNumber.abs().toNumber()

	const symbols = [
		{ value: 1e6, symbol: 'M' },
		{ value: 1e3, symbol: 'K' },
		{ value: 1, symbol: '' }
	]
	const matchSymbol = symbols.find((sym) => absValue >= sym.value)

	let formatValue: string
	if (!matchSymbol) {
		formatValue = new BigNumber(absValue).toFixed(decimalPoint, roundingMode)
	} else {
		const regRemoveTrailingZero = /\.0+$|(\.[0-9]*[1-9])0+$/
		formatValue = new BigNumber(absValue / matchSymbol.value)
			.toFixed(decimalPoint, roundingMode)
			.replace(regRemoveTrailingZero, '$1')
	}

	return sign + formatValue + (matchSymbol ? matchSymbol.symbol : '')
}
