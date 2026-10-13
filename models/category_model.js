import { mongoose, Schema } from "./db.js";

const CategorySchema = new Schema({
  name: { type: String, unique: true, null: false },
  image: { type: String },
  desc: { type: String },
});

const Category = mongoose.model("categories", CategorySchema);

export default Category;
