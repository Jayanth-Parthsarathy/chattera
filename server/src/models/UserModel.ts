import { Schema, model, connect, Types } from "mongoose";
interface IUser {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  rooms?: Types.ObjectId[];
}
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String },
    password: { type: String, required: true },
    rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
  },
  {
    timestamps: true,
  },
);

const User = model<IUser>("User", userSchema);
export default User;
