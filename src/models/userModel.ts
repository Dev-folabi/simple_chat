import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  userName: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
