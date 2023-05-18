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
		type Line
	} from 'd3'
	import type {ILineChartOptions, ILineChartExtendedOptions, BaseSelection } from './types'
	import { cleanChart, setChartDimension } from './utils'
	import type { ILineChartDataItem } from '../../utils'
	import { t } from '$stores';
	import { tick } from 'svelte'

	export let chartData: ILineChartDataItem[] = []

	let selectedDate: number
	let containerEl: HTMLDivElement
	let yAxisEl: SVGElement
	let mainEl: SVGElement
	let tooltipEl: HTMLDivElement

	$: chartOptions = {
		containerWidth: 375,
    containerHeight: 200,
    marginLeft: 46,
    marginRight: 16,
    marginTop: 16,
    marginBottom: 30
	}

	let extendedChartOptions: ILineChartExtendedOptions = {
		containerWidth: 0,
		containerHeight: 0,
		marginLeft: 0,
		marginRight: 0,
		marginTop: 0,
		marginBottom: 0,
		chartWidth: 0,
		chartHeight: 0,
		chartBottom: 0,
		xAccessor: () => void(0),
		yAccessor: () => void(0)
	}

	$: containerEl && chartData.length && plotChart(chartData, chartOptions)

	$: info = typeof selectedDate === 'number' && chartData.find(e => e.day === selectedDate) as ILineChartDataItem

	function extendsOptions(options: ILineChartOptions): ILineChartExtendedOptions {
		const { marginLeft, marginTop, marginRight, marginBottom, containerWidth, containerHeight } = options
		const chartWidth = containerWidth - marginLeft - marginRight
		const chartHeight = containerHeight - marginTop - marginBottom
		const chartBottom = containerHeight - marginBottom
		const xAccessor = (d) => d.day
		const yAccessor = (d) => d.percent
		return {
			...options,
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
		const rangeX = [0, chartWidth]
		return scaleBand<number>().domain(domainX).range(rangeX).paddingOuter(-0.5)
	}

	function drawXAxis(el: BaseSelection, scaleFunc: ScaleBand<number>, options: ILineChartExtendedOptions): void {
		const { marginTop, marginLeft, chartHeight, chartBottom } = options
		const axisX = axisBottom(scaleFunc).tickSizeInner(0).tickSizeOuter(0).tickPadding(5).tickFormat(e => $t('expert.statistics.recentGames', { num: e.valueOf() }))

		el.append('g')
			.attr('class', 'x-axis')
			.attr('color', '#666')
			.attr('transform', `translate(${marginLeft}, ${chartBottom})`)
			.call(axisX)
		
		el.selectAll('.x-axis .tick')
			.append('line')
			.attr('x1', 0)
			.attr('y1', 0)
			.attr('x2', 0)
			.attr('y2', -chartHeight + marginTop)
			.attr('stroke', '#eee')

		el.select('.domain')
			.attr('stroke', '#eee')
	}

	function getScaleY(options: ILineChartExtendedOptions): ScaleLinear<number, number> {
		const { chartBottom, marginTop } = options
		const rangeY = [chartBottom, marginTop + marginTop]
		return scaleLinear().domain([0, 100]).rangeRound(rangeY)
	}

	function drawYAxis(el: BaseSelection, scaleFunc: ScaleLinear<number, number>, options: ILineChartExtendedOptions): void {
		const { marginLeft, chartWidth } = options
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
			.attr('x2', chartWidth)
			.attr('y2', 0)
			.attr('stroke', '#eee')

		el.select('.domain')
			.attr('stroke', '#eee')
	}

	function getLine(scaleX: ScaleBand<number>, scaleY: ScaleLinear<number, number>, options: ILineChartExtendedOptions) {
		const { xAccessor, yAccessor, marginLeft } = options

		return line<ILineChartDataItem>()
			.x((d) => scaleX(xAccessor(d)) + scaleX.bandwidth() / 2 + marginLeft)
			.y((d) => scaleY(yAccessor(d)))
	}

	function drawLine(
		el: BaseSelection,
		data: ILineChartDataItem[],
		scaleX: ScaleBand<number>,
		scaleY: ScaleLinear<number, number>,
		lineFunc: Line<ILineChartDataItem>,
		options: ILineChartExtendedOptions
	): void {
		const { xAccessor, yAccessor, containerHeight, marginLeft, marginBottom } = options

		function _drawLineLabels() {
			el
				.append('g')
				.attr('class', 'labels')
				.selectAll()
				.data(data)
				.enter()
				.append('text')
				.attr('font-size', 10)
				.attr('x', d => scaleX(xAccessor(d)) + scaleX.bandwidth() / 2 + marginLeft - 16)
				.attr('y', d => scaleY(yAccessor(d)) - 10)
				.attr('fill', 'rgb(var(--im-monorepo-primary)')
				.text(d => `${d.percent}%`)
		}

		function _drawLineCircles() {
			el
				.append('g')
				.attr('class', 'circles')
				.selectAll()
				.data(data)
				.enter()
				.append('circle')
				.attr('cx', d => scaleX(xAccessor(d)) + scaleX.bandwidth() / 2 + marginLeft)
				.attr('cy', d => scaleY(yAccessor(d)))
				.attr('r', 2)
				.attr('stroke', 'rgb(var(--im-monorepo-primary)')
				.attr('fill', '#fff')
		}

		function _drawLine() {
			return el
				.append('path')
				.datum(data)
				.attr('d', lineFunc)
				.style('fill', 'none')
				.attr('stroke', 'rgb(var(--im-monorepo-primary)')
				.attr('stroke-width', 1)
		}

		function _drawGradientArea() {
			let gradient= el
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

			gradient
				.append('stop')
				.attr('offset', '100%')

			el
				.append('path')
				.datum(data)
				.attr('d', d => {
					const lineValues = lineFunc(d).slice(1)
					const splitted = lineValues.split(',')

					return `M${marginLeft},${containerHeight - marginBottom},${lineValues},l0,${(containerHeight - marginBottom - Number(splitted[splitted.length - 1]))}`
				})
				.attr('fill', 'url(#gradient-color)')

			return gradient
		}

		function _addGradientTransition(gradient, transitionFunc) {
			gradient
				.selectAll('stop')
				.each(function(_, i) {
					if(i === 0) {
						select(this)
							.attr('style', 'stop-color:#bfe0ff;stop-opacity:0')
							.transition(transitionFunc)
							.delay(1000)
							.attr('style', 'stop-color:#bfe0ff;stop-opacity:0.5');
					}
					else {
						select(this)
							.attr('style', 'stop-color:#bfe0ff;stop-opacity:0')
							.transition(transitionFunc)
							.delay(1000)
							.attr('style', 'stop-color:#ffffff;stop-opacity:1');
					}
				})

			gradient
				.attr('y2', '0')
				.transition(transitionFunc)
				.delay(1000)
				.attr('y2', '1')
		}

		function _addLineTransition(line, transitionFunc) {
			const pathLength = line.node()?.getTotalLength() || 0

			line
				.attr('stroke-dasharray', pathLength)
				.attr('stroke-dashoffset', pathLength)
				.transition(transitionFunc)
				.attr('stroke-dashoffset', 0)
		}

		if(data.length === 1) {
			el
				.append('circle')
				.attr('cx', scaleX(xAccessor(data[0])) + scaleX.bandwidth() / 2 + marginLeft)
				.attr('cy', scaleY(yAccessor(data[0])))
				.attr('r', 2)
				.attr('stroke', 'rgb(var(--im-monorepo-primary)')
				.attr('fill', '#fff')
			return
		}

		const line = _drawLine()
		
		const gradient = _drawGradientArea()

		_drawLineCircles()

		_drawLineLabels()
		
		const transitionFunc: any = transition().duration(1000).ease(easeSinIn)

		_addGradientTransition(gradient, transitionFunc)

		_addLineTransition(line, transitionFunc)
	}

	function registerPointerDownEvent(
		el: BaseSelection,
		data: ILineChartDataItem[],
		scaleX: ScaleBand<number>,
		scaleY: ScaleLinear<number, number>,
		options: ILineChartExtendedOptions
	): void {
		const { marginLeft, containerWidth, containerHeight, xAccessor, yAccessor } = options

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

		function _resetHoveringDisplayedEls(): void {
			const tooltip = select(tooltipEl)
			const outerCircle = select('.outerCircle')
			const innerCircle = select('.innerCircle')

			tooltip.style('opacity', 0)
			outerCircle.style('opacity', 0)
			innerCircle.style('opacity', 0)
			setTimeout(() => {
				tooltip.style('left', 'auto')
				tooltip.style('right', 'auto')
			}, 200)
		}

		async function _getTooltipPosition(x: number, y: number): Promise<[number, number, string]> {
			await tick() // to get correct tooltip element width

			const tooltipElement = select(tooltipEl).node() as HTMLElement
			const { width: tooltipWidth, height: tooltipHeight } = tooltipElement.getBoundingClientRect()

			const tooltipTop = y - tooltipHeight / 2
			let tooltipClass = 'left'
			let tooltipLeft = x + 16

			if (tooltipLeft + tooltipWidth > containerWidth) {
				tooltipLeft = containerWidth - x + 16
				tooltipClass = 'right'
			}

			return [tooltipLeft, tooltipTop, tooltipClass]
		}

		function _drawHoveringDisplayedEls(x: number, y: number, tooltipLeft: number, tooltipTop: number, tooltipClass: string): void {
			const tooltip = select(tooltipEl)
			const outerCircle = select('.outerCircle')
			const innerCircle = select('.innerCircle')

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
			const pos = data.map(d => ([scaleX(xAccessor(d)) + scaleX.bandwidth() / 2 + marginLeft, scaleY(yAccessor(d))]))
			const index = leastIndex(pos, (a, b) => Math.abs(a[0] - pointerPosition[0]) - Math.abs(b[0] - pointerPosition[0]))

			if(Math.abs(pos[index][1] - pointerPosition[1]) > 10 || Math.abs(pos[index][0] - pointerPosition[0]) > 10) return _resetHoveringDisplayedEls()

			selectedDate = data[index].day

			const [closestXCord, closestYCord] = pos[index]

			const [tooltipLeft, tooltipTop, tooltipClass] = await _getTooltipPosition(closestXCord, closestYCord)

			_drawHoveringDisplayedEls(closestXCord, closestYCord, tooltipLeft, tooltipTop, tooltipClass)
		}

		_createHoveringDisplayedEls(el)

		el.append('rect')
			.attr('fill', 'transparent')
			.attr('class', 'pointerArea')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', containerWidth)
			.attr('height', containerHeight)
			.on('pointerdown', _onListeningRectPointerDown)
	}

	function plotChart(data: ILineChartDataItem[], options: ILineChartOptions): void {
		extendedChartOptions = extendsOptions(options)
		const { containerWidth, containerHeight } = extendedChartOptions
		const mainSvg = select(mainEl), yAxisSvg = select(yAxisEl)

		cleanChart(mainSvg)
		cleanChart(yAxisSvg)

		setChartDimension(mainSvg, { width: containerWidth, height: containerHeight })
		setChartDimension(yAxisSvg, { width: containerWidth, height: containerHeight })

		const scaleX = getScaleX(data, extendedChartOptions)
		const scaleY = getScaleY(extendedChartOptions)
		const lineFunc = getLine(scaleX, scaleY, extendedChartOptions)
		drawXAxis(mainSvg, scaleX, extendedChartOptions)
		drawYAxis(yAxisSvg, scaleY, extendedChartOptions)
		drawLine(mainSvg, data, scaleX, scaleY, lineFunc, extendedChartOptions)

		registerPointerDownEvent(mainSvg, data, scaleX, scaleY, extendedChartOptions)
	}
</script>

<div
	data-cid='LineChart'
	class="relative mx-auto"
	style="width: {extendedChartOptions.containerWidth}px; height: {extendedChartOptions.containerHeight}px"
>
	<!-- fixed yAxis -->
	<svg bind:this={yAxisEl} />
	<!-- chart -->
	<div
		bind:this={containerEl}
		class="absolute top-0 left-0 overflow-x-auto overflow-y-hidden"
		style:width="{extendedChartOptions.containerWidth}px"
		style:height="{extendedChartOptions.containerHeight}px"
	>
		<svg bind:this={mainEl} />
	</div>
	<!-- tooltip -->
	<div
		bind:this={tooltipEl}
		id={'detail-tooltip'}
		class="absolute z-10 py-1 px-2 rounded-lg min-h-[28px] opacity-0 transition-opacity pointer-events-none shadow-[4px_6px_6px_0_rgba(76,158,234,0.3)]
			after:border-[5px] after:content-[''] after:block after:w-0 after:h-0 after:absolute after:top-1/2 after:-translate-y-1/2"
		style="background: linear-gradient(270deg, #1990FF 0%, #38B4FF 100%);"
	>
		{#if Object.keys(info).length}
			<span class="text-white text-[10px] leading-[21px]">{$t('expert.statistics.recentGameHitRate', { total: info.total, hit: info.hit })} {info.percent}%</span>
		{/if}
	</div>
</div>

<style lang='scss'>
	#detail-tooltip {
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
