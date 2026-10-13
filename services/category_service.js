import model from "../models/category_model.js";

const CategoryService = {
  getById: async (id) => {
    let result = await model.findById(id);
    return result;
  },

  getByName: async (name) => {
    let result = await model.findOne({ name });
    return result;
  },
  all: async () => {
    let cats = await model.find();
    return cats;
  },
  add: async (name, image, desc) => {
    let obj = { name, image, desc };
    let newcat = await new model(obj).save();
    return newcat;
  },
  modify: async (id, obj) => {
    let result = await model.findByIdAndUpdate(id, obj);
    return result;
  },

  drop: async (id) => {
    let result = await model.findByIdAndDelete(id);
    return result;
  },
};

export default CategoryService;
