import { mongoose, Schema } from "./db.js";

const TagSchema = new Schema({
  name: { type: String, null: false, unique: true },
});

const Tag = mongoose.model("tags", TagSchema);

export default Tag;
