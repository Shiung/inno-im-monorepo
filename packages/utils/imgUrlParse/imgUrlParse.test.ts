import { vi } from 'vitest'
import { beImgUrlParse, ImageType } from '.'
import * as _config from 'env-config'

test('id prop passed', () => {
  const { BE_CDN_URL: beCdn } = _config.getConfig()
  const id = 123
  const type = ImageType.competitors

  const url = beImgUrlParse({ id, type })

  expect(url).toBe(`${beCdn}/badge/${ImageType[type]}/${id}.png`)
})

test('id prop not passed', () => {
  const { VENDERID: vd, BE_CDN_URL: beCdn } = _config.getConfig()
  const type = ImageType.competitors

  const url = beImgUrlParse({ type })

  expect(url).toBe(`${beCdn}/badge/${ImageType[type]}/${vd}.png`)
})


test('getConfig is missing', async () => {
  const mockGetConfig = vi.spyOn(_config, 'getConfig')
  mockGetConfig.mockImplementation(() => undefined)

  const id = 123
  const type = ImageType.competitors
  const url = beImgUrlParse({ id, type })

  expect(url).toBe('')
})