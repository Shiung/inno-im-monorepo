export interface ILineChartOptions {
	containerWidth: number
	containerHeight: number
	marginLeft: number
	marginRight: number
	marginTop: number
	marginBottom: number
}

export interface ILineChartDataItem { day: number; hit: number; total: number; percent: number}

export interface ILineChartExtendedOptions extends ILineChartOptions {
	innerWidth: number
	chartWidth: number
	chartHeight: number
	chartBottom: number
	xAccessor: (d: ILineChartDataItem) => number
	yAccessor: (d: ILineChartDataItem) => number
}

export type BaseSelection = d3.Selection<SVGElement, unknown, null, undefined>

export type tooltipDIVNode = d3.Selection<HTMLDivElement, unknown, null, undefined>

export type baseSVGNode = d3.Selection<d3.BaseType, unknown, HTMLElement, unknown>
