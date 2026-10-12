import { mongoose, Schema } from "./db.js";

const userSchema = new Schema({
  name: { type: String, nullable: false ,required:true},
  phone: { type: String, nullable: false, unique: true ,required :true},
  password: { type: String, required: true },
  displayName: { type: String ,required :true},
  role: { type: Number ,default: 2},
  profile: { type: String },
  created: { type: Date, default: Date.now },
});

userSchema.index({name: 1})

const User = mongoose.model("users", userSchema);

export default User;
