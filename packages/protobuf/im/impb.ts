import { load } from 'protobufjs'

import type { Type } from 'protobufjs'
import { Enum } from './constants'
import type {
  IRequest, IPush, IPushMessageEntity,
  IRequestMessageEntity, IChatIdsWrapper, IReportAbuseArgs,
  IFetchArgs, IFetchOtherOrdersArgs
} from './types'

class ImBp {
  public _request: ReturnType<Type['lookupType']> | null = null
  public _requestMessageEntity: ReturnType<Type['lookupType']> | null = null
  public _push: ReturnType<Type['lookupType']> | null = null
  public _pushMessageEntity: ReturnType<Type['lookupType']> | null = null
  public _pushMessageEntityWrapper: ReturnType<Type['lookupType']> | null = null
  public _chatIdsWrapper: ReturnType<Type['lookupType']> | null = null
  public _fetchArgs: ReturnType<Type['lookupType']> | null = null
  public _reportAbuseArgs: ReturnType<Type['lookupType']> | null = null
  public _fetchOtherOrdersArgs: ReturnType<Type['lookupType']> | null = null
  public _chatSetting: ReturnType<Type['lookupType']> | null = null
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
    this._pushMessageEntityWrapper = root.lookupType('PushMessageEntityWrapper')
    this._requestMessageEntity = root.lookupType('RequestMessageEntity')
    this._chatIdsWrapper = root.lookupType('ChatIdsWrapper')
    this._fetchArgs = root.lookupType('FetchArgs')
    this._reportAbuseArgs = root.lookupType('ReportAbuseArgs')
    this._fetchOtherOrdersArgs = root.lookupType('FetchOtherOrders')
    this._chatSetting = root.lookupType('ChatSetting')
    this.enum = {
      command: root.getEnum('Command') as unknown as typeof Enum['command'],
      visible: root.getEnum('Visible') as unknown as typeof Enum['visible'],
      contentType: root.getEnum('ContentType') as unknown as typeof Enum['contentType']
    }

    this.done = true
  }

  safeCode<T>(callback: () => T) {
    try { return callback() }
    catch (e) {
      console.warn(e)
      return {} as any
    }
  }

  get push() {
    return {
      encode: (data: IPush) => this.safeCode(() => this._push?.encode(data).finish()),
      decode: (data: ArrayBuffer) => this.safeCode(() => this._push?.decode(new Uint8Array(data)) as unknown as IPush)
    }
  }

  get request() {
    return {
      encode: (data: IRequest) => this.safeCode(() => this._request?.encode(data).finish()),
      decode: (data: ArrayBuffer) => this.safeCode(() => this._request?.decode(new Uint8Array(data)) as unknown as IRequest)
    }
  }

  get pushMessageEntity() {
    return {
      encode: (data: IPushMessageEntity) => this.safeCode(() => this._pushMessageEntity?.encode(data).finish()),
      decode: (data: ArrayBuffer) => this.safeCode(() => this._pushMessageEntity?.decode(new Uint8Array(data)) as unknown as IPushMessageEntity)
    }
  }

  get pushMessageEntityWrapper() {
    return {
      encode: (data: { pushMessageEntity: IPushMessageEntity[] }) => this.safeCode(() => this._pushMessageEntityWrapper?.encode(data).finish()),
      decode: (data: ArrayBuffer) => this.safeCode(() => this._pushMessageEntityWrapper?.decode(new Uint8Array(data)) as unknown as { pushMessageEntity: IPushMessageEntity[] })
    }
  }

  get requestMessageEntity() {
    return {
      encode: (data: IRequestMessageEntity) => this.safeCode(() => this._requestMessageEntity?.encode(data).finish()),
      decode: (data: ArrayBuffer) => this.safeCode(() => this._requestMessageEntity?.decode(new Uint8Array(data)) as unknown as IRequestMessageEntity)
    }
  }

  get chatIdsWrapper() {
    return {
      encode: (data: IChatIdsWrapper) => this.safeCode(() => this._chatIdsWrapper?.encode(data).finish()),
      decode: (data: ArrayBuffer) => this.safeCode(() => this._chatIdsWrapper?.decode(new Uint8Array(data)) as unknown as IChatIdsWrapper)
    }
  }

  get fetchArgs() {
    return {
      encode: (data: IFetchArgs) => this.safeCode(() => this._fetchArgs?.encode(data).finish()),
      decode: (data: ArrayBuffer) => this.safeCode(() => this._fetchArgs?.decode(new Uint8Array(data)) as unknown as IFetchArgs)
    }
  }

  get reportAbuseArgs() {
    return {
      encode: (data: IReportAbuseArgs) => this.safeCode(() => this._reportAbuseArgs?.encode(data).finish()),
      decode: (data: ArrayBuffer) => this.safeCode(() => this._reportAbuseArgs?.decode(new Uint8Array(data)) as unknown as IReportAbuseArgs)
    }
  }

  get fetchOtherOrdersArgs() {
    return {
      encode: (data: IFetchOtherOrdersArgs) => this.safeCode(() => this._fetchOtherOrdersArgs?.encode(data).finish()),
      decode: (data: ArrayBuffer) => this.safeCode(() => this._fetchOtherOrdersArgs?.decode(new Uint8Array(data)) as unknown as IFetchOtherOrdersArgs)
    }
  }

  get chatSetting() {
    return {
      encode: (data: IChatSetting) => this.safeCode(() => this._chatSetting?.encode(data).finish()),
      decode: (data: ArrayBuffer) => this.safeCode(() => this._chatSetting?.decode(new Uint8Array(data)) as unknown as IChatSetting)
    }
  }
}

export default ImBp
