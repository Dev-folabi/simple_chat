import mongoose, { Schema, Document } from "mongoose";

interface IMessage extends Document {
  sender: string;
  content: string;
  timestamp: Date;
}

const messageSchema: Schema = new Schema({
  sender: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>("Message", messageSchema);
