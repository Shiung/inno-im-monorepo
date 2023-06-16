import { load } from 'protobufjs'

import type { Type } from 'protobufjs'
import { Enum } from './constants'
import type {
  IRequest, IPush, IPushMessageEntity,
  IRequestMessageEntity, IChatIdsWrapper, IReportAbuseAegs
} from './types'

class ImBp {
  public _request: ReturnType<Type['lookupType']> | null = null
  public _requestMessageEntity: ReturnType<Type['lookupType']> | null = null
  public _push: ReturnType<Type['lookupType']> | null = null
  public _pushMessageEntity: ReturnType<Type['lookupType']> | null = null
  public _chatIdsWrapper: ReturnType<Type['lookupType']> | null = null
  public _reportAbuseArgs: ReturnType<Type['lookupType']> | null = null
  public enum = Enum
  public done: boolean = false

  constructor(protobuf: string) {
    this.init(protobuf)
  }

  async init(protobuf: string) {
    const root = await load(protobuf)
    this._request = root.lookupType('Request')
    this._push = root.lookupType('Push')
    this._pushMessageEntity = root.lookupType('PushMessageEntity')
    this._requestMessageEntity = root.lookupType('RequestMessageEntity')
    this._chatIdsWrapper = root.lookupType('ChatIdsWrapper')
    this._reportAbuseArgs = root.lookupType('ReportAbuseArgs')
    this.enum = {
      command: root.getEnum('Command') as unknown as typeof Enum['command'],
      visible: root.getEnum('Visible') as unknown as typeof Enum['visible'],
      contentType: root.getEnum('ContentType') as unknown as typeof Enum['contentType']
    }

    this.done = true
  }

  get push() {
    return {
      encode: (data: IPush) => this._push?.encode(data).finish(),
      decode: (data: ArrayBuffer): IPush => this._push?.decode(new Uint8Array(data)) as unknown as IPush
    }
  }

  get request() {
    return {
      encode: (data: IRequest) => this._request?.encode(data).finish(),
      decode: (data: ArrayBuffer): IRequest => this._request?.decode(new Uint8Array(data)) as unknown as IRequest
    }
  }

  get pushMessageEntity() {
    return {
      encode: (data: IPushMessageEntity) => this._pushMessageEntity?.encode(data).finish(),
      decode: (data: ArrayBuffer): IPushMessageEntity => this._pushMessageEntity?.decode(new Uint8Array(data)) as unknown as IPushMessageEntity
    }
  }

  get requestMessageEntity() {
    return {
      encode: (data: IRequestMessageEntity) => this._requestMessageEntity?.encode(data).finish(),
      decode: (data: ArrayBuffer): IRequestMessageEntity => this._requestMessageEntity?.decode(new Uint8Array(data)) as unknown as IRequestMessageEntity
    }
  }

  get chatIdsWrapper() {
    return {
      encode: (data: IChatIdsWrapper) => this._chatIdsWrapper?.encode(data).finish(),
      decode: (data: ArrayBuffer): IChatIdsWrapper => this._chatIdsWrapper?.decode(new Uint8Array(data)) as unknown as IChatIdsWrapper
    }
  }

  get reportAbuseAegs() {
    return {
      encode: (data: IReportAbuseAegs) => this._reportAbuseArgs?.encode(data).finish(),
      decode: (data: ArrayBuffer): IReportAbuseAegs => this._reportAbuseArgs?.decode(new Uint8Array(data)) as unknown as IReportAbuseAegs
    }
  }
}

export default ImBp
