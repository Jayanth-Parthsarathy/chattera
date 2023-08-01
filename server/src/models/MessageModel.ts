import { model, Schema, Types } from "mongoose";
interface IMessage {
  text: string;
  userId: Types.ObjectId;
  roomId: Types.ObjectId;
}

const MessageSchema = new Schema<IMessage>({
  text: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  roomId: { type: Schema.Types.ObjectId, ref: "Room" },
});

const Message = model<IMessage>("Message", MessageSchema);
export default Message;
