export interface ILineChartOptions {
	containerWidth: number
	containerHeight: number
	marginLeft: number
	marginRight: number
	marginTop: number
	marginBottom: number
}

export interface ILineChartExtendedOptions extends ILineChartOptions {
	chartWidth: number
	chartHeight: number
	chartBottom: number
	xAccessor: <T>(d: T) => number
	yAccessor: <T>(d: T) => number
}

export type BaseSelection = d3.Selection<SVGElement, unknown, null, undefined>