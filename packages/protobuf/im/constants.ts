export enum ECommand {
  COMMAND_NONE = 0,
  SEND_MESSAGE = 2,
  FETCH_MESSAGES = 3,
  REPORT_ABUSE = 4,
  SWITCH_LANGUAGE = 5,
  USER_GROUP = 6,
  SEND_TEXTING_MESSAGE = 7,
  FETCH_TEXTING_MESSAGES = 8,
  SUBSCRIBE_CHAT = 9,
  UNSUBSCRIBE_CHAT = 10,
  PUSH_MESSAGE = 100,
  PUSH_TEXTING_MESSAGE = 101,
  READ_TEXTING_MESSAGE = 102,
  FETCH_READ_POINTERS = 103,
  USER_STATUS = 200,
  GROUP_STATUS = 201,
  GROUP_INFO = 202,
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

