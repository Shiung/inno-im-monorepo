export enum ECommand {
  COMMAND_NONE = 0,
  SEND_MESSAGE = 2,
  FETCH_MESSAGES = 3,
  REPORT_ABUSE = 4,
  SWITCH_LANGUAGE = 5,
  SUBSCRIBE_CHAT = 9,
  UNSUBSCRIBE_CHAT = 10,
  PUSH_MESSAGE = 100,
  USER_STATUS = 200
}

export enum EContentType {
  CONTENT_TYPE_NONE = 0,
  CHAT = 1,
  ORDER = 2
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

