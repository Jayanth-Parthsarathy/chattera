import { model, Schema, Types } from "mongoose";
interface IMessage {
  text: string;
  user: Types.ObjectId;
  room: Types.ObjectId;
}

const MessageSchema = new Schema<IMessage>({
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  room: { type: Schema.Types.ObjectId, ref: "Room" },
});

const MessageModel = model<IMessage>("Message", MessageSchema);
export default MessageModel;
