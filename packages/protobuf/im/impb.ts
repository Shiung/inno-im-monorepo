import { load } from 'protobufjs'

import type { Type } from 'protobufjs'
import { Enum } from './constants'
import type { IRequest, IMessageEntity } from './types'

class ImBp {
  public _request: ReturnType<Type['lookupType']> | null = null
  public _messageEntity: ReturnType<Type['lookupType']> | null = null
  public enum = Enum
  public done: boolean = false

  constructor(protobuf: string) {
    this.init(protobuf)
  }

  async init(protobuf: string) {
    const root = await load(protobuf)
    this._request = root.lookupType('Request')
    this._messageEntity = root.lookupType('MessageEntity')
    this.enum = {
      command: root.getEnum('Command') as unknown as typeof Enum['command'],
      MessageEntity: {
        visible: this._messageEntity.getEnum('Visible') as unknown as typeof Enum['MessageEntity']['visible'],
        contentType: this._messageEntity.getEnum('ContentType') as unknown as typeof Enum['MessageEntity']['contentType']
      }
    }

    this.done = true
  }

  get request() {
    return {
      encode: (data: IRequest) => this._request?.encode(data).finish(),
      decode: (data: ArrayBuffer): IRequest => this._request?.decode(new Uint8Array(data)) as unknown as IRequest
    }
  }

  get messageEntity() {
    return {
      encode: (data: IMessageEntity) => this._messageEntity?.encode(data).finish(),
      decode: (data: ArrayBuffer): IMessageEntity => this._messageEntity?.decode(new Uint8Array(data)) as unknown as IMessageEntity
    }
  }
}

export default ImBp
