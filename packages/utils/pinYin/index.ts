import SimplePinYin from './zh_CN'

interface IDictionary {
  origin: string
  wholeWord: string
  firstWord: string
  wholeWordWithSpace: string
}

/**
 * Usage see README.md
 */
class PinYin {
  private dictionary: IDictionary[]
  private dictCacheMode: boolean
  private dictCached: Set<string>
  constructor() {
    this.dictionary = []
    this.dictCached = new Set()
    this.dictCacheMode = false
  }

  // 移除使用者輸入的所有空白
  removeAllSpace(str: string) {
    if (typeof str !== 'string') return '' // 防呆

    return str.replace(/\s/g, '')
  }

  /**
   * @return Array
   */
  convert(str: string) {
    if (typeof str !== 'string') return [] // 防呆
    return SimplePinYin.convertPYs(str)
  }

  search(keyword: string) {
    if (typeof keyword !== 'string') return [] // 防呆

    keyword = this.removeAllSpace(keyword)
    const _lowerKeyword = keyword.toLocaleLowerCase()
    const match = []
    for (const league of this.dictionary) {
      if (
        league.wholeWord.toLocaleLowerCase().includes(_lowerKeyword) ||
        league.firstWord.toLocaleLowerCase().includes(_lowerKeyword) ||
        league.origin.toLocaleLowerCase().includes(_lowerKeyword)
      ) {
        match.push(league.origin)
      }
    }
    return match
  }

  setDictCacheMode(value: boolean) {
    if (typeof value === 'boolean') {
      this.dictCacheMode = value
    }
    return this
  }

  // 判斷是否轉換過存在cache裡
  hasDictCached(name: string) {
    return this.dictCacheMode && this.dictCached.has(name)
  }

  createDict(source: string | string[]) {
    if (Array.isArray(source)) {
      for (const name of source) {
        if (typeof name !== 'string') continue // 防呆
        if (this.hasDictCached(name)) continue
        const [wholeWord, firstWord, wholeWordWithSpace, origin] = this.convert(name)
        if (this.dictCacheMode) this.dictCached.add(name)
        this._add({
          wholeWord,
          firstWord,
          wholeWordWithSpace,
          origin
        })
      }
    } else if (typeof source === 'string') {
      this.createDict([source])
    }
    return this
  }

  updateDict(source: string | string[]) {
    if (Array.isArray(source)) {
      for (const name of source) {
        if (typeof name !== 'string') continue // 防呆
        const [wholeWord, firstWord, wholeWordWithSpace, origin] = this.convert(name)
        if (this.dictCacheMode) this.dictCached.add(name)
        this._update({
          wholeWord,
          firstWord,
          wholeWordWithSpace,
          origin
        })
      }
    } else if (typeof source === 'string') {
      this.updateDict([source])
    }
    return this
  }

  updateOrCreateDict(source: string | string[]) {
    if (Array.isArray(source)) {
      for (const name of source) {
        const isExsist = this.dictionary.find(item => item.origin === name)
        if (isExsist) {
          this.updateDict([name])
        } else {
          this.createDict([name])
        }
      }
    } else if (typeof source === 'string') {
      this.updateOrCreateDict([source])
    }
    return this
  }

  cleanDictCache() {
    this.dictCached.clear()
    return this
  }

  cleanDict() {
    this.dictionary = []
    this.dictCached.clear()
    return this
  }

  _add({ wholeWord = '', firstWord = '', wholeWordWithSpace = '', origin = '' }) {
    this.dictionary.push({
      wholeWord,
      firstWord,
      wholeWordWithSpace,
      origin
    })
  }

  _update({ wholeWord = '', firstWord = '', wholeWordWithSpace = '', origin = '' }) {
    this.dictionary.forEach(item => {
      if (origin === item.origin) {
        item.wholeWord = wholeWord
        item.firstWord = firstWord
        item.wholeWordWithSpace = wholeWordWithSpace
      }
      return item
    })
  }
}

export default new PinYin()
