import { mongoose, Schema } from "./db";

const advSchema = new Schema({
  image: { type: String },
  status: { type: String, enum: ["PROCESSING", "ACTIVE", "IDEL"] },
  created: { type: Date, default: Date.now },
});

export const Adv = mongoose.model("advs", advSchema);
