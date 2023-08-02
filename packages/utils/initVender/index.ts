import { initColor } from '../vdThemeGenerator'

export default (props: { repoName: string }) => {
  const { repoName } = props
  initColor(repoName)
}
