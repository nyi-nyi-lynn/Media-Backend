import { mongoose, Schema } from "./db";

const commentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, required: true, ref: "posts" },
  user: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  content: { type: String },
  image: { type: String },
  status: { type: String, enum: ["PROCESSING", "DONE", "DENIED"] },
});

export const Comment = mongoose.model("comments", commentSchema);
