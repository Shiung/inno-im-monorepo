import type { StreamLiveStatus, Currency } from './constant'

export type TKeyOfCurrency = `${Currency}`

export type EnumNumericValUnion<StringUnion> = StringUnion extends `${infer NumberUnion extends number}` ? NumberUnion : StringUnion

export type TStreamLiveStatus = EnumNumericValUnion<`${StreamLiveStatus}`>