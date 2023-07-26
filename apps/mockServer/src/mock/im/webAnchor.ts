import { mock, Random } from 'mockjs'
import { prefix, withData, randomPostTime, genPager, genHouseId, genTeamInfo } from './utils'
import { getRandomItemFromArray } from 'utils'

import type * as Types from 'api/im/types'
import type { IMockData } from '../../types'

Random.extend({
  anchorhousename: function() {
    const names = ['球球直播', '娟娟直播', '糖果直播', '君君直播']
    return this.pick(names)
  },
  anchornickname: function() {
    const names = ['翠花姑凉的小花', '娟娟', '糖果', '君君']
    return this.pick(names)
  }
})

const langList = [
  {
    name: 'English',
    describe: '英语',
    code: 'en'
  },
  {
    name: 'Azərbaycan dili',
    describe: '阿塞拜疆语',
    code: 'aze'
  },
  {
    name: 'Bahasa Indonesia',
    describe: '印度尼西亚',
    code: 'ind'
  },
  {
    name: 'Bosanski',
    describe: '波斯尼亚语',
    code: 'bos'
  },
  {
    name: 'Česky',
    describe: '捷克语',
    code: 'cze'
  },
  {
    name: 'Cрпски',
    describe: '塞尔维亚语',
    code: 'ser'
  },
  {
    name: 'Dansk',
    describe: '丹麦语',
    code: 'dan'
  },
  {
    name: 'Deutsch',
    describe: '德语',
    code: 'deu'
  },
  {
    name: 'Eesti',
    describe: '爱沙尼亚',
    code: 'est'
  },
  {
    name: 'Español',
    describe: '西班牙语',
    code: 'esp'
  },
  {
    name: 'Français',
    describe: '法语',
    code: 'fra'
  },
  {
    name: 'Hrvatski',
    describe: '克罗地亚语',
    code: 'hrv'
  },
  {
    name: 'Italiano',
    describe: '意大利语',
    code: 'ita'
  },
  {
    name: 'Latviešu',
    describe: '拉脱维亚语',
    code: 'lat'
  },
  {
    name: 'Lietuvių',
    describe: '立陶宛语',
    code: 'rep'
  },
  {
    name: 'Magyar',
    describe: '匈牙利语',
    code: 'mag'
  },
  {
    name: 'Nederlands',
    describe: '荷兰语',
    code: 'ned'
  },
  {
    name: 'Norsk',
    describe: '挪威语',
    code: 'nor'
  },
  {
    name: 'Polski',
    describe: '波兰语',
    code: 'pol'
  },
  {
    name: 'Português',
    describe: '葡萄牙语',
    code: 'por'
  },
  {
    name: 'Português do Brasil',
    describe: '巴西葡萄牙语',
    code: 'bra'
  },
  {
    name: 'Română',
    describe: '罗马尼亚语',
    code: 'rom'
  },
  {
    name: 'Shqip',
    describe: '阿尔巴尼亚语',
    code: 'alb'
  },
  {
    name: 'Slovenčina',
    describe: '斯洛文尼亚',
    code: 'slo'
  },
  {
    name: 'Slovenščina',
    describe: '斯洛伐克语',
    code: 'slove'
  },
  {
    name: 'Suomeksi',
    describe: '芬兰语',
    code: 'fin'
  },
  {
    name: 'Svenska',
    describe: '瑞典语',
    code: 'sve'
  },
  {
    name: 'Tiếng Việt',
    describe: '越南语',
    code: 'vie'
  },
  {
    name: 'Türkçe',
    describe: '土耳其',
    code: 'tur'
  },
  {
    name: 'Ελληνικά',
    describe: '希腊语',
    code: 'gre'
  },
  {
    name: 'Български',
    describe: '保加利亚语',
    code: 'bul'
  },
  {
    name: 'Македонски',
    describe: '马其顿语',
    code: 'mac'
  },
  {
    name: 'Pусский',
    describe: '俄语',
    code: 'pyc'
  },
  {
    name: 'Українська',
    describe: '乌克兰语',
    code: 'ukr'
  },
  {
    name: 'ქართული',
    describe: '格鲁吉亚语',
    code: 'geo'
  },
  {
    name: 'العربية',
    describe: '阿拉伯语',
    code: 'ara'
  },
  {
    name: 'فارسی',
    describe: '波斯语',
    code: 'far'
  },
  {
    name: 'हिन्दी',
    describe: '印地语',
    code: 'hin'
  },
  {
    name: 'বাংলা',
    describe: '孟加拉语',
    code: 'ben'
  },
  {
    name: 'ไทย',
    describe: '泰语',
    code: 'tha'
  },
  {
    name: 'မြန်မာဘာသာ',
    describe: '缅甸语',
    code: 'bur'
  },
  {
    name: 'ភាសាខ្មែរ',
    describe: '高棉语',
    code: 'cam'
  },
  {
    name: '日本语',
    describe: '日语',
    code: 'jp'
  },
  {
    name: '中文简体',
    describe: '简体',
    code: 'zh'
  },
  {
    name: '中文繁體',
    describe: '繁体',
    code: 'tw'
  },
  {
    name: '한국어',
    describe: '韩语',
    code: 'kor'
  },
  {
    name: 'Malay',
    describe: '马来语',
    code: 'ml'},
]

const genLangMockData = (length: number): Types.IWebAnchorLanguage['res']['data'] => {
  const randIndexes = Array.from({ length }, () => Random.integer(0, langList.length - 1))
  const randDefault = Random.pick(randIndexes)

  return {
    lang: langList.filter((_, idx) => randIndexes.includes(idx)),
    defaultLang: randDefault ? langList[randDefault].code : ''
  }
}

const webAnchors: IMockData[] = [
  {
    url: `${prefix}/v1/anchor/web-anchors`,
    timeout: 500,
    response: ({ query }) => mock(withData<Types.IWebAnchors>({
      list: Array.from({ length: Number(query.pageSize) || 20 }, (_, idx) => ({
        houseId: genHouseId(),
        houseImage: "https://oss-logo-hk.oss-accelerate.aliyuncs.com/business/image/596/PztnHi1kR12iCdGOCr1lvA.png",
        userImage: getRandomItemFromArray([
          "https://oss-logo-hk.oss-accelerate.aliyuncs.com/business/image/596/4Hl7wS2hSoOb-brzYS1yLw.jpg",
          "https://oss-",
          "",
        ]),
        visitHistory: Random.natural(0, 999999999999),
        houseName: Random.integer(0, 1) ? "@ANCHORHOUSENAME" : "@csentence",
        nickName: Random.integer(0, 1) ? "@ANCHORHOUSENAME" : "@csentence",
        playStreamAddress: "https://live5.haoksoft.com/live/52295.flv?auth_key=1690190714-0-2295-d919e4d3db0784389037cfd582826042",
        playStreamAddress2: "https://live5.haoksoft.com/live/52295.m3u8?auth_key=1690190714-0-2295-d919e4d3db0784389037cfd582826042",
        liveStatus: Random.natural(1, 4) as Types.IWebAnchor['liveStatus'],
        sid: idx % 3 === 0 ? 100 : Random.integer(1,3) as Types.IWebAnchor['sid'],
        fansCount: Random.natural(0, 10000000),
        attentionStatus: Random.natural(0, 2) as Types.IWebAnchor['attentionStatus'],
        matchCount: Random.natural(0, 10),
        houseIntroduction: "@csentence",
        languageType: query.lang
      })),
      pager: genPager({ pageIdx: Number(query.pageIdx), pageSize: Number(query.pageSize) })
    }))
  },
  {
    url: `${prefix}/v1/anchor/web-anchor/detail`,
    response: () => mock(withData<Types.IWebAnchorDetail>({
      userImage: "https://oss-logo-hk.oss-accelerate.aliyuncs.com/business/image/596/4Hl7wS2hSoOb-brzYS1yLw.jpg",
      nickName: "@ANCHORNICKNAME",
      personalIntroduction: '@cparagraph'
    }))
  },
  {
    url: `${prefix}/v1/anchor/web-anchor/match-list`,
    timeout: 500,
    response: () => mock(withData<Types.IWebAnchorMatches>({
      matchList: Array.from({ length: Random.natural(0, 5) }, () => ({
        ...genTeamInfo(true) as Pick<Types.IWebAnchorMatch, 'homeId' | 'homeName' | 'awayId' | 'awayName'>,
        tnName: "@cname",
        tid: Random.integer(10000, 50000),
        sportId: Random.integer(1, 3) as Types.IWebAnchorMatch['sportId'],
        matchId: "@id",
        matchTime: randomPostTime(),
        matchStatus: Random.integer(1, 8) as Types.IWebAnchorMatch['matchStatus'],
        mid: Random.integer(10000, 50000),
        vd: Random.word(1),
        score: "@integer(1,10)-@integer(1,10)"
      }))
    }))
  },
  {
    url: `${prefix}/v1/anchor/web-anchor/life`,
    response: ({ query }) => mock(withData<Types.IWebAnchorLife>({
      list: Array.from({ length: Random.natural(0, 20) }, () => ({
        date: randomPostTime(),
        image: "@image",
        context: "@cparagraph",
      })),
      pager: genPager({ pageIdx: Number(query.pageIdx), pageSize: Number(query.pageSize) })
    }))
  },
  {
    url: `${prefix}/v1/anchor/web-anchor/photos`,
    response: ({ query }) => mock(withData<Types.IWebAnchorPhotos>({
      list: Array.from({ length: Random.natural(0, 20) }, () => ({
        date: randomPostTime(),
        imageDesc: "@image",
        image: "@image",
      })),
      pager: genPager({ pageIdx: Number(query.pageIdx), pageSize: Number(query.pageSize) })
    }))
  },
  {
    url: `${prefix}/v1/anchor/web-anchor/info`,
    response: () => mock(withData<Types.IWebAnchorInfo>({
      country: "@region",
      height: String(Random.natural(150, 170)),
      gender: Random.natural(1, 3) as Types.IWebAnchorInfo['res']['data']['gender'],
      weight: String(Random.natural(40, 60)),
      birthday: "@datetime",
      favorite: "@cword",
      description: "@csentence",
      state: Random.natural(1, 3) as Types.IWebAnchorInfo['res']['data']['state'],
    }))
  },
  {
    url: `${prefix}/v1/anchor/web-anchors/recommend`,
    response: ({ query }) => mock(withData<Types.IWebAnchorsRecommend>({
      list: Array.from({ length: Random.integer(0, 5) }, (_, idx) => ({
        houseId: genHouseId(),
        houseImage: "https://oss-logo-hk.oss-accelerate.aliyuncs.com/business/image/596/PztnHi1kR12iCdGOCr1lvA.png",
        userImage: getRandomItemFromArray([
          "https://oss-logo-hk.oss-accelerate.aliyuncs.com/business/image/596/4Hl7wS2hSoOb-brzYS1yLw.jpg",
          "https://oss-",
          "",
        ]),
        visitHistory: Random.natural(0, 999999999999),
        houseName: Random.integer(0, 1) ? "@ANCHORHOUSENAME" : "@csentence",
        nickName: Random.integer(0, 1) ? "@ANCHORHOUSENAME" : "@csentence",
        playStreamAddress: "https://live5.hqzhuce.com/live/10596.flv?auth_key=1681107440-0-596-0c34337853d9ae4d8bd536ab2ea083da",
        playStreamAddress2: "https://live5.hqzhuce.com/live/10596.flv?auth_key=1681107440-0-596-0c34337853d9ae4d8bd536ab2ea083da",
        liveStatus: Random.natural(1, 4) as Types.IWebAnchor['liveStatus'],
        sid: idx % 3 === 0 ? 100 : Random.integer(1,3) as Types.IWebAnchor['sid'],
        fansCount: Random.natural(0, 10000000),
        attentionStatus: Random.natural(0, 2) as Types.IWebAnchor['attentionStatus'],
        matchCount: Random.natural(0, 10),
        houseIntroduction: "@csentence",
        languageType: query.lang
      })),
    }))
  },
  {
    url: `${prefix}/v1/anchor/web-anchor/language`,
    response: () => mock(withData<Types.IWebAnchorLanguage>(genLangMockData(Random.integer(0, 40))))
  },
  {
    url: `${prefix}/v1/anchor/web-anchor/language/constants`,
    response: () => mock(withData<Types.IWebAnchorLanguageConstants>({
      lang: [
        {
            "code": "th_TH",
            "thirdCode": "tha"
        },
        {
            "code": "vi_VN",
            "thirdCode": "vie"
        },
        {
            "code": "zh_CN",
            "thirdCode": "zh"
        },
        {
            "code": "zh_HK",
            "thirdCode": "tw"
        },
        {
            "code": "hi_IN",
            "thirdCode": "hin"
        },
        {
            "code": "id_ID",
            "thirdCode": "ind"
        },
        {
            "code": "ms_MY",
            "thirdCode": "ml"
        },
        {
            "code": "pt_PT",
            "thirdCode": "por"
        },
        {
            "code": "en_US",
            "thirdCode": "en"
        },
        {
            "code": "ja_JP",
            "thirdCode": "jp"
        },
        {
            "code": "ko_KR",
            "thirdCode": "kor"
        }
      ]
    }))
  }
]

export default webAnchors
