const flash = (element: HTMLElement) => {
	requestAnimationFrame(() => {
		element.style.transition = 'none'
		element.style.color = 'rgba(255,62,0,1)'
		element.style.backgroundColor = 'rgb(var(--im-monorepo-primary)'

		setTimeout(() => {
			element.style.transition = 'color 1s, background 1s'
			element.style.color = ''
			element.style.backgroundColor = ''
		})
	})
}

export default flash
