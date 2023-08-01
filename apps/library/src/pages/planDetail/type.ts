import type { ILanguages } from 'env-config'

export interface IFetchArticleDetailQuery {
  articleId: string
  lang: ILanguages
  token: string
}