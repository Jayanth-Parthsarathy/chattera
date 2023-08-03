export interface Message {
  _id: string;
  text: string;
  user: MessageUser;
}

export interface MessageUser {
  _id: string;
  username: string;
}

export type MessageFromSocket{
  username: string;
  text: string;
}
