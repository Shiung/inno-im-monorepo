<script lang="ts">
	import {
		select,
		scaleLinear,
		scaleBand,
		line,
		axisBottom,
		axisLeft,
		transition,
		easeSinIn,
		pointer,
		leastIndex,
		type ScaleLinear,
		type ScaleBand,
		type Selection
	} from 'd3'
	import type {
		ILineChartOptions,
		ILineChartDataItem,
		ILineChartExtendedOptions,
		BaseSelection,
		tooltipDIVNode,
		baseSVGNode
	} from './types'
	import { cleanChart, setChartDimension } from './utils'
	import { t } from '$stores';
	import { tick } from 'svelte'

	export let cid: string = ''
	export let chartOptions: {
		containerWidth?: number
		containerHeight?: number
		marginLeft?: number
		marginRight?: number
		marginTop?: number
		marginBottom?: number
		xInterval?: number
	} = {}
	export let chartData: ILineChartDataItem[] = []

	$: combinedOptions = {
		containerWidth: 676,
		containerHeight: 350,
		marginLeft: 50,
		marginRight: 20,
		marginTop: 20,
		marginBottom: 50,
		...chartOptions
	}

	$: containerEl && doPlotChart(chartData, combinedOptions)

	$: info = typeof selectedDate === 'number' && chartData.find(e => e.day === selectedDate) as ILineChartDataItem

	let selectedDate: number
	let containerEl: HTMLDivElement
	let yAxisEl: SVGElement
	let mainEl: SVGElement
	let tooltipEl: HTMLDivElement

	function extendsOptions(options: ILineChartOptions, data: ILineChartDataItem[]): ILineChartExtendedOptions {
		const { marginLeft, marginTop, marginRight, marginBottom, containerWidth, containerHeight } = options
		const innerWidth = containerWidth - marginLeft - marginRight + 32
		const chartWidth = innerWidth
		const chartHeight = containerHeight - marginTop
		const chartBottom = chartHeight - marginBottom
		const xAccessor = (d: ILineChartDataItem) => d.day
		const yAccessor = (d: ILineChartDataItem) => d.percent
		return {
			...options,
			innerWidth,
			chartWidth,
			chartHeight,
			chartBottom,
			xAccessor,
			yAccessor
		}
	}

	function getScaleX(data: ILineChartDataItem[], options: ILineChartExtendedOptions): ScaleBand<number> {
		const { xAccessor, chartWidth } = options
		const domainX = data.map(e => xAccessor(e))
		const rangeX = [16, chartWidth - 16]
		return scaleBand<number>().domain(domainX).range(rangeX).paddingOuter(-0.5)
	}

	function drawXAxis(el: BaseSelection, scaleFunc: ScaleBand<number>, options: ILineChartExtendedOptions): void {
		const { chartBottom, chartHeight, marginBottom } = options
		const axisX = axisBottom(scaleFunc).tickSizeInner(0).tickSizeOuter(0).tickPadding(5).tickFormat(e => $t('expert.statistics.recentGames', { num: e.valueOf() }))

		el.append('g')
			.attr('class', 'x-axis')
			.attr('color', '#666')
			.attr('transform', `translate(0, ${chartBottom})`)
			.call(axisX)
		
		el.selectAll('.x-axis .tick')
			.append('line')
			.attr('x1', 0)
			.attr('y1', 0)
			.attr('x2', 0)
			.attr('y2', -134)
			.attr('stroke', '#eee')

		el.select('.domain')
			.attr('stroke', '#eee')
	}

	function getScaleY(options: ILineChartExtendedOptions): ScaleLinear<number, number> {
		const { chartBottom, marginTop } = options
		const rangeY = [chartBottom, marginTop + 16]
		return scaleLinear().domain([0, 100]).rangeRound(rangeY)
	}

	function drawYAxis(el: BaseSelection, scaleFunc: ScaleLinear<number, number>, options: ILineChartExtendedOptions): void {
		const { marginLeft, innerWidth } = options
		const axisY = axisLeft(scaleFunc).tickValues([25, 50, 75, 100]).tickSizeInner(0).tickSizeOuter(0).tickPadding(5).tickFormat(e => `${e}%`)

		el.append('g')
			.attr('class', 'y-axis')
			.attr('transform', `translate(${marginLeft}, 0)`)
			.attr('color', '#666')
			.call(axisY)
			
		el.selectAll('.y-axis .tick')
			.append('line')
			.attr('x1', 0)
			.attr('y1', 0)
			.attr('x2', innerWidth - 32)
			.attr('y2', 0)
			.attr('stroke', '#eee')

		el.select('.domain')
			.attr('stroke', '#eee')
	}

	function drawLine(el: BaseSelection, data: ILineChartDataItem[], scaleX: ScaleBand<number>, scaleY: ScaleLinear<number, number>, options: ILineChartExtendedOptions): void {
		const { xAccessor, yAccessor, chartHeight, marginBottom } = options
		const pathLine = line<ILineChartDataItem>()
			.x((d: ILineChartDataItem) => scaleX(xAccessor(d)) + scaleX.bandwidth() / 2 || 0)
			.y((d: ILineChartDataItem) => scaleY(yAccessor(d)) || 0)

		let path, gradient
		if(data.length === 1) {
			path = el
				.append('circle')
				.attr('cx', scaleX(xAccessor(data[0])))
				.attr('cy', scaleY(yAccessor(data[0])))
				.attr('r', 2)
				.attr('stroke', '#4C9EEA')
				.attr('fill', '#fff')
		} else {
			gradient = el
				.append('defs')
				.append('linearGradient')
				.attr('id', 'gradient-color')
				.attr('x1', 0)
				.attr('y1', 0)
				.attr('x2', 0)
				.attr('y2', 0)

			gradient
				.append('stop')
				.attr('offset', '0%')
				.attr('style', 'stop-color:#bfe0ff;stop-opacity:0.5');

			gradient
				.append('stop')
				.attr('offset', '100%')
				.attr('style', 'stop-color:#ffffff;stop-opacity:1');

			path = el
				.append('path')
				.datum(data)
				.attr('d', pathLine)
				.style('fill', 'none')
				.attr('stroke', '#4C9EEA')
				.attr('stroke-width', 1)
			
			el
				.append('path')
				.datum(data)
				.attr('d', d => {
					const lineValues = pathLine(d).slice(1)
					const splitted = lineValues.split(',')

					return `M16,${chartHeight - marginBottom},${lineValues},l0,${(chartHeight - marginBottom - Number(splitted[splitted.length - 1]))}`
				})
				.attr('fill', 'url(#gradient-color)')

			el
				.append('g')
				.attr('class', 'circles')
				.selectAll()
				.data(data)
				.enter()
				.append('circle')
				.attr('cx', d => scaleX(xAccessor(d)) + scaleX.bandwidth() / 2)
				.attr('cy', d => scaleY(yAccessor(d)))
				.attr('r', 2)
				.attr('stroke', '#4C9EEA')
				.attr('fill', '#fff')

			el
				.append('g')
				.attr('class', 'labels')
				.selectAll()
				.data(data)
				.enter()
				.append('text')
				.attr('font-size', 10)
				.attr('x', d => scaleX(xAccessor(d)) + scaleX.bandwidth() / 2 - 16)
				.attr('y', d => scaleY(yAccessor(d)) - 10)
				.attr('fill', '#4C9EEA')
				.text(d => `${d.percent}%`)
		}

		const pathLength = path.node()?.getTotalLength() || 0
		const transitionFunc: any = transition().duration(1000).ease(easeSinIn)

		gradient
			.attr('y2', '0')
			.transition(transitionFunc)
			.delay(1000)
			.attr('y2', '1')

		path
			.attr('stroke-dasharray', pathLength)
			.attr('stroke-dashoffset', pathLength)
			.transition(transitionFunc)
			.attr('stroke-dashoffset', 0)
		
	}

	function registerHoveringDisplayedEvent(el: BaseSelection, data: ILineChartDataItem[], scaleX: ScaleBand<number>, scaleY: ScaleLinear<number, number>, options: ILineChartExtendedOptions): void {
		const { marginTop, marginBottom, marginLeft, chartWidth, containerWidth, chartHeight } = options

		function _createHoveringDisplayedEls(el: BaseSelection): void {
			el.append('circle')
				.attr('class', 'outerCircle')
				.attr('r', 4)
				.attr('stroke', '#4DA4EE')
				.attr('fill', 'white')
				.attr('stroke-width', 1)
				.style('opacity', 0)
				
			el.append('circle')
				.attr('class', 'innerCircle')
				.attr('r', 1)
				.attr('stroke', '#4DA4EE')
				.attr('fill', '#4DA4EE')
				.attr('stroke-width', 1)
				.style('opacity', 0)
		}

		function _getTooltipEl(): tooltipDIVNode {
			return select(tooltipEl)
		}

		function _getOuterCircleEl(): baseSVGNode {
			return select('.outerCircle')
		}

		function _getInnerCircleEl(): baseSVGNode {
			return select('.innerCircle')
		}

		function _resetHoveringDisplayedEls(): void {
			const tooltip = _getTooltipEl()
			const outerCircle = _getOuterCircleEl()
			const innerCircle = _getInnerCircleEl()

			tooltip.style('opacity', 0)
			outerCircle.style('opacity', 0)
			innerCircle.style('opacity', 0)
			setTimeout(() => {
				tooltip.style('left', 'auto')
				tooltip.style('right', 'auto')
			}, 200)
		}

		async function _getTooltipPosition(tooltipEl: Selection<HTMLDivElement, unknown, null, undefined>, x: number, y: number): Promise<[number, number, string]> {
			await tick() // to get correct tooltip element width

			const tooltipElement = tooltipEl.node() as HTMLElement
			const { width: tooltipWidth, height: tooltipHeight } = tooltipElement.getBoundingClientRect()

			const tooltipTop = y - tooltipHeight / 2
			let tooltipClass = 'left'
			let tooltipLeft = x + marginLeft - 16 + 10

			if (tooltipLeft + tooltipWidth > containerWidth) {
				tooltipLeft = containerWidth - (x + marginLeft - 16) + 10
				tooltipClass = 'right'
			}

			return [tooltipLeft, tooltipTop, tooltipClass]
		}

		function _drawHoveringDisplayedEls(x: number, y: number, tooltipLeft: number, tooltipTop: number, tooltipClass: string): void {
			const tooltip = _getTooltipEl()
			const outerCircle = _getOuterCircleEl()
			const innerCircle = _getInnerCircleEl()

			outerCircle.attr('cx', x).attr('cy', y).style('opacity', 1)
			innerCircle.attr('cx', x).attr('cy', y).style('opacity', 1)

			tooltip
				.style('top', `${tooltipTop}px`)
				.style('opacity', 1)
				.classed('left', tooltipClass === 'left')
				.classed('right', tooltipClass === 'right')
			
			if(tooltipClass === 'left') {
				tooltip
					.style('top', `${tooltipTop}px`)
					.style('left', `${tooltipLeft}px`)
					.style('right', 'auto')
					.style('opacity', 1)
					.classed('left', true)
			} else {
				tooltip
					.style('top', `${tooltipTop}px`)
					.style('left', 'auto')
					.style('right', `${tooltipLeft}px`)
					.style('opacity', 1)
					.classed('right', true)
			}
		}

		async function _onListeningRectPointerDown(e: MouseEvent): Promise<void> {
			const pointerPosition = pointer(e)
			const pos = data.map(d => ({ x: scaleX(d.day) + scaleX.bandwidth() / 2, y: scaleY(d.percent) }))
			const index = leastIndex(pos, (a, b) => Math.abs(a.x - pointerPosition[0]) - Math.abs(b.x - pointerPosition[0]))
			
			if(Math.abs(pos[index].y - pointerPosition[1]) > 10 || Math.abs(pos[index].x - pointerPosition[0]) > 10) return _resetHoveringDisplayedEls()

			selectedDate = data[index].day

			const [closestXCord, closestYCord] = [pos[index].x, pos[index].y]
			const tooltip = _getTooltipEl()
			const [tooltipLeft, tooltipTop, tooltipClass] = await _getTooltipPosition(tooltip, closestXCord, closestYCord)

			_drawHoveringDisplayedEls(closestXCord, closestYCord, tooltipLeft, tooltipTop, tooltipClass)
		}

		_createHoveringDisplayedEls(el)

		el.append('rect')
			.attr('fill', 'transparent')
			.attr('class', 'pointerArea')
			.attr('x', 16)
			.attr('y', marginTop)
			.attr('width', chartWidth)
			.attr('height', chartHeight - marginTop - marginBottom)
			.on('pointerdown', _onListeningRectPointerDown)
	}

	function plotChart(data: ILineChartDataItem[], options: ILineChartOptions): void {
		const extendedChartOptions = extendsOptions(options, data)
		const { containerWidth, chartWidth, chartHeight } = extendedChartOptions
		const mainSvg = select(mainEl), yAxisSvg = select(yAxisEl)

		cleanChart(mainSvg)
		cleanChart(yAxisSvg)

		setChartDimension(mainSvg, { width: chartWidth, height: chartHeight })
		setChartDimension(yAxisSvg, { width: containerWidth, height: chartHeight })

		const scaleX = getScaleX(data, extendedChartOptions)
		const scaleY = getScaleY(extendedChartOptions)

		drawXAxis(mainSvg, scaleX, extendedChartOptions)
		drawLine(mainSvg, data, scaleX, scaleY, extendedChartOptions)
		drawYAxis(yAxisSvg, scaleY, extendedChartOptions)

		registerHoveringDisplayedEvent(mainSvg, data, scaleX, scaleY, extendedChartOptions)
	}

	function doPlotChart(data: ILineChartDataItem[], options: ILineChartOptions) {
		data.length > 0 && plotChart(data, options)
	}
</script>

<div
	data-cid={cid}
	class="relative mx-auto"
	style="width: {combinedOptions.containerWidth}px; height: {combinedOptions.containerHeight}px"
>
	<!-- fixed yAxis -->
	<svg bind:this={yAxisEl} />
	<!-- chart -->
	<div
		bind:this={containerEl}
		class="absolute top-0 left-0 overflow-x-auto overflow-y-hidden"
		style:width="{combinedOptions.containerWidth -
			combinedOptions.marginLeft -
			combinedOptions.marginRight + 32}px"
		style:height="{combinedOptions.containerHeight + 16}px"
		style:margin-left="{combinedOptions.marginLeft - 16}px"
		style:margin-right="{combinedOptions.marginRight}px"
	>
		<svg bind:this={mainEl} />
	</div>
	<!-- tooltip -->
	<div
		bind:this={tooltipEl}
		id={'detail-tooltip'}
		class="absolute z-10 py-1 px-2 rounded-lg min-h-[28px] opacity-0 transition-opacity pointer-events-none"
		style="background: linear-gradient(270deg, #1990FF 0%, #38B4FF 100%);box-shadow: 4px 6px 6px 0 rgba(76,158,234,0.3);"
	>
		{#if Object.keys(info).length}
			<span class="text-white text-[10px] leading-[21px]">{$t('expert.statistics.recentGameHitRate', { total: info.total, hit: info.hit })} {info.percent}%</span>
		{/if}
	</div>
</div>

<style lang='scss'>
	#detail-tooltip {
		&::after {
			border-width: 5px;
			content: '';
			display: block;
			width: 0;
			height: 0;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
		}
		&:global(.left)::after {
			border-color: transparent #38B4FF transparent transparent;
			left: -10px;
		}
		&:global(.right)::after {
			border-color: transparent transparent transparent #1990FF;
			right: -10px;
		}
	}
</style>
