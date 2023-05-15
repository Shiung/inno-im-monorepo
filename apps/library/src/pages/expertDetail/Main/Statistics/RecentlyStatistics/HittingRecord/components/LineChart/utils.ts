import { select } from 'd3'
import type { BaseSelection } from './types'

export function cleanChart(el: BaseSelection): void {
	if (!el.empty()) {
		el.selectChildren().each(function () {
			select(this).remove()
		})
	}
}

export function setChartDimension(el: BaseSelection, options: {width: number; height: number }): void {
	el.attr('width', options.width).attr('height', options.height)
}
