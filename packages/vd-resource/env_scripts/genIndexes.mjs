import dirTree from 'directory-tree'
import { activedVenders } from 'env-config/constants.mjs'

for (const vender of activedVenders) {
  const root = `./${vender}`
  const index = `${root}/index.ts`
  await $`rm ${index}` 
  await $`touch ${index}`

  dirTree(root, { extensions: /\.(webp|png|jpg|svg)/}, async item => {

    // 將vender名稱移除
    const venderRemoved = item.path.replace(`${vender}/`, '')
    // 將所有的 / . 空白字元 替換成 _
    const name = venderRemoved.replace(/(\/|\.|\s)/g, '_')
    console.log('removed', venderRemoved)
    await $`echo "export {default as ${name}} from './${venderRemoved}'" >> ${index}`
  })
}


