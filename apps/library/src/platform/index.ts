import './library.css'
import '../commonInit'

// Reexport your entry components here
export { default as App } from '../App.svelte'
export { default as Anchor } from './anchors'
export { default as Streaming } from './streaming'
// export * as store from './platform/store'

// deprecated, 下面幾個已棄用，待平台更新後替換掉
export { default as PlatformExpert } from '$pages/platformExpert'
export * from '$pages/platformExpert'
// export * as store from '$stores/library'

// 下面是測試用的 等正式上版到prod後要刪除
export { default as Test } from '$pages/test/index.svelte'
export { default as Uikit } from '$pages/test/index.svelte'
