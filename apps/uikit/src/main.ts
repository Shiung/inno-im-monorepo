import './app.css'
import { initVender } from 'utils'
import App from './App.svelte'

initVender({repoName: 'im-monorepo' })

const app = new App({
  target: document.getElementById('app'),
})

export default app
