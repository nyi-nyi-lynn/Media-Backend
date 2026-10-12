import { mongoose, Schema } from "./db";

const TagSchema = new Schema({
  name: { type: String, null: false, unique: true },
});

export const Tag = mongoose.model("tags", TagSchema);
