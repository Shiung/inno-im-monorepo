import './library.css'
import './commonInit'

// Reexport your entry components here
export { default as App } from './App.svelte'
export { default as PlatformExpert } from '$pages/platformExpert/index.svelte'

// 下面是測試用的 等正式上版到prod後要刪除
export { default as Test } from './pages/test/index.svelte'
export { default as Uikit } from './pages/test/index.svelte'
