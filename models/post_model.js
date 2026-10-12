import { mongoose, Schema } from "./db";

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  images: { type: Array, nullable: true },
  category: { type: Schema.Types.ObjectId, required: true, ref: "categories" },
  tag: { type: Schema.Types.ObjectId, required: true, ref: "tags" },
  author: { type: Schema.Types.ObjectId, reuqired: true, ref: "users" },
  likes: { type: Number },
  views: { type: Number },
  created: { type: Date, default: Date.now },
});

postSchema.index({title : 1,category : 1,tag : 1, author : 1});

export const Post = mongoose.model("posts", postSchema);
