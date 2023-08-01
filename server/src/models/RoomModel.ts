import { model, Schema, Types } from "mongoose";
interface IRoom {
  name: string;
  messages: Types.ObjectId[];
  users: Types.ObjectId[];
  owner: Types.ObjectId;
}

const RoomSchema = new Schema<IRoom>({
  name: { type: String, required: true },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

const Room = model<IRoom>("Room", RoomSchema);
export default Room;
