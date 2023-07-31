import { Schema, model, connect } from "mongoose";
interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String },
  password: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);
export default User;
