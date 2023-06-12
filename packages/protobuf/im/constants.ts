export enum ECommand {
  COMMAND_NONE = 0,
  SEND_MESSAGE = 1,
  FETCH_MESSAGES = 2,
  REPORT_ABUSE = 3,
  SWITCH_LANGUAGE = 4,
  SUBSCRIBE_CHAT = 5,
  UNSUBSCRIBE_CHAT = 6,
  PING = 7,
  PUSH_MESSAGE = 100,
  USER_STATUS = 200,
  PONG = 300,
}

export enum EContentType {
  CONTENT_TYPE_NONE = 0,
  CHAT = 1,
  ORDER = 2,
  ANCHOR = 3,
}

export enum EVisible {
  VISIBLE_NONE = 0,
  ALL = 1,
  SENDER = 2
}
export const Enum = {
  command: ECommand,
  contentType: EContentType,
  visible: EVisible
}

