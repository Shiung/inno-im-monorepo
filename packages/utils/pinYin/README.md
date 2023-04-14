
## 簡中轉換拼音

參考: https://www.cnblogs.com/meteoric_cry/p/5954547.html

### Example：
```js
import { pinYin } from 'utils'

pinYin.createDict(['你好吗','哈啰','好棒棒']) // 建立辭典
pinYin.search('ni hao') // output ['你好吗']
pinYin.search('hao')    // output ['你好吗', '好棒棒']
pinYin.search('nh')     // 支持字首 output ['你好吗']
pinYin.search('好棒')    // 支持原文 output ['好棒棒']

// 辭典快取 (建議使用)
pinYin.setDictCacheMode(true).createDict(['你好吗','哈啰']).createDict(['你好吗','哈啰', '测试'])

// 建立或更新
pinYin.updateOrCreateDict(['你好吗','哈啰', '测试'])

// 清除辭典
pinYin.cleanDict()

// 清除辭典快取
pinYin.cleanDictCache()
```
### Todo
- 優化 - 快取查詢結果
