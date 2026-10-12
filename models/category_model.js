import { mongoose, Schema } from "./db";

const CategorySchema = new Schema({
    name : {type : String,unique : true,null: false},
    image : {type : String},
    desc : {type :String}
});

export const Category = mongoose.model("categories", CategorySchema);
