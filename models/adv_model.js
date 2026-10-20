import { mongoose, Schema } from "./db.js";

const advSchema = new Schema({
  image: { type: String },
  content: { type: String, required: true },
  status: { type: String, enum: ["PROCESSING", "ACTIVE", "IDEL"],default : "PROCESSING" },
  created: { type: Date, default: Date.now },
});

const Adv = mongoose.model("advs", advSchema);

export default Adv;
