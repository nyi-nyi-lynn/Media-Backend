import { mongoose, Schema } from "./db.js";

const commentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, required: true, ref: "posts" },
  user: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  content: { type: String },
  image: { type: String },
  status: { type: String, enum: ["PROCESSING", "DONE", "DENIED"] ,default : "PROCESSING"},
  created : {type : Date , default : Date.now}
});

 const Comment = mongoose.model("comments", commentSchema);

 export default Comment;
