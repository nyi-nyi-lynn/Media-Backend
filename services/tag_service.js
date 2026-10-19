import model from "../models/tag_model.js";

const TagService = {
  getByName: async (name) => {
    let tag = await model.findOne({ name });
    return tag;
  },
  getById: async (id) => {
    let tag = await model.findById(id);
    return tag;
  },
  all: async () => {
    let tags = await model.find();
    return tags;
  },
  add: async (name) => {
    let newTag = await new model({ name }).save();
    return newTag;
  },
  modify: async (id, obj) => {
    let result = await model.findByIdAndUpdate(id, obj,{new : true});
    return result;
  },
  drop: async (id) => {
    let deleted = await model.findByIdAndDelete(id);
    return deleted;
  },
};

export default TagService;
