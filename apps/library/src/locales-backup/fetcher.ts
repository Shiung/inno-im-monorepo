export default (path: string) => {
  switch (path) {
case 'zh_CN_common': return () => import('./zh_CN_common.json')
case 'zh_CN_anchor': return () => import('./zh_CN_anchor.json')
case 'zh_CN_expert': return () => import('./zh_CN_expert.json')
case 'zh_CN_chat': return () => import('./zh_CN_chat.json')
case 'zh_CN_user': return () => import('./zh_CN_user.json')
case 'zh_CN_errorCodeMsg': return () => import('./zh_CN_errorCodeMsg.json')
case 'zh_CN_expertSort': return () => import('./zh_CN_expertSort.json')
case 'en_US_common': return () => import('./en_US_common.json')
case 'en_US_anchor': return () => import('./en_US_anchor.json')
case 'en_US_expert': return () => import('./en_US_expert.json')
case 'en_US_chat': return () => import('./en_US_chat.json')
case 'en_US_user': return () => import('./en_US_user.json')
case 'en_US_errorCodeMsg': return () => import('./en_US_errorCodeMsg.json')
case 'en_US_expertSort': return () => import('./en_US_expertSort.json')
case 'ms_MY_common': return () => import('./ms_MY_common.json')
case 'ms_MY_anchor': return () => import('./ms_MY_anchor.json')
case 'ms_MY_expert': return () => import('./ms_MY_expert.json')
case 'ms_MY_chat': return () => import('./ms_MY_chat.json')
case 'ms_MY_user': return () => import('./ms_MY_user.json')
case 'ms_MY_errorCodeMsg': return () => import('./ms_MY_errorCodeMsg.json')
case 'ms_MY_expertSort': return () => import('./ms_MY_expertSort.json')
case 'id_ID_common': return () => import('./id_ID_common.json')
case 'id_ID_anchor': return () => import('./id_ID_anchor.json')
case 'id_ID_expert': return () => import('./id_ID_expert.json')
case 'id_ID_chat': return () => import('./id_ID_chat.json')
case 'id_ID_user': return () => import('./id_ID_user.json')
case 'id_ID_errorCodeMsg': return () => import('./id_ID_errorCodeMsg.json')
case 'id_ID_expertSort': return () => import('./id_ID_expertSort.json')
case 'vi_VN_common': return () => import('./vi_VN_common.json')
case 'vi_VN_anchor': return () => import('./vi_VN_anchor.json')
case 'vi_VN_expert': return () => import('./vi_VN_expert.json')
case 'vi_VN_chat': return () => import('./vi_VN_chat.json')
case 'vi_VN_user': return () => import('./vi_VN_user.json')
case 'vi_VN_errorCodeMsg': return () => import('./vi_VN_errorCodeMsg.json')
case 'vi_VN_expertSort': return () => import('./vi_VN_expertSort.json')
case 'zh_HK_common': return () => import('./zh_HK_common.json')
case 'zh_HK_anchor': return () => import('./zh_HK_anchor.json')
case 'zh_HK_expert': return () => import('./zh_HK_expert.json')
case 'zh_HK_chat': return () => import('./zh_HK_chat.json')
case 'zh_HK_user': return () => import('./zh_HK_user.json')
case 'zh_HK_errorCodeMsg': return () => import('./zh_HK_errorCodeMsg.json')
case 'zh_HK_expertSort': return () => import('./zh_HK_expertSort.json')
case 'ja_JP_common': return () => import('./ja_JP_common.json')
case 'ja_JP_anchor': return () => import('./ja_JP_anchor.json')
case 'ja_JP_expert': return () => import('./ja_JP_expert.json')
case 'ja_JP_chat': return () => import('./ja_JP_chat.json')
case 'ja_JP_user': return () => import('./ja_JP_user.json')
case 'ja_JP_errorCodeMsg': return () => import('./ja_JP_errorCodeMsg.json')
case 'ja_JP_expertSort': return () => import('./ja_JP_expertSort.json')
case 'ko_KR_common': return () => import('./ko_KR_common.json')
case 'ko_KR_anchor': return () => import('./ko_KR_anchor.json')
case 'ko_KR_expert': return () => import('./ko_KR_expert.json')
case 'ko_KR_chat': return () => import('./ko_KR_chat.json')
case 'ko_KR_user': return () => import('./ko_KR_user.json')
case 'ko_KR_errorCodeMsg': return () => import('./ko_KR_errorCodeMsg.json')
case 'ko_KR_expertSort': return () => import('./ko_KR_expertSort.json')
case 'th_TH_common': return () => import('./th_TH_common.json')
case 'th_TH_anchor': return () => import('./th_TH_anchor.json')
case 'th_TH_expert': return () => import('./th_TH_expert.json')
case 'th_TH_chat': return () => import('./th_TH_chat.json')
case 'th_TH_user': return () => import('./th_TH_user.json')
case 'th_TH_errorCodeMsg': return () => import('./th_TH_errorCodeMsg.json')
case 'th_TH_expertSort': return () => import('./th_TH_expertSort.json')
case 'hi_IN_common': return () => import('./hi_IN_common.json')
case 'hi_IN_anchor': return () => import('./hi_IN_anchor.json')
case 'hi_IN_expert': return () => import('./hi_IN_expert.json')
case 'hi_IN_chat': return () => import('./hi_IN_chat.json')
case 'hi_IN_user': return () => import('./hi_IN_user.json')
case 'hi_IN_errorCodeMsg': return () => import('./hi_IN_errorCodeMsg.json')
case 'hi_IN_expertSort': return () => import('./hi_IN_expertSort.json')
case 'pt_PT_common': return () => import('./pt_PT_common.json')
case 'pt_PT_anchor': return () => import('./pt_PT_anchor.json')
case 'pt_PT_expert': return () => import('./pt_PT_expert.json')
case 'pt_PT_chat': return () => import('./pt_PT_chat.json')
case 'pt_PT_user': return () => import('./pt_PT_user.json')
case 'pt_PT_errorCodeMsg': return () => import('./pt_PT_errorCodeMsg.json')
case 'pt_PT_expertSort': return () => import('./pt_PT_expertSort.json')
default: return () => import('./en_US_common.json')
}}
