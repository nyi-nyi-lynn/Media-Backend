import AdvModel from "../models/adv_model.js";

const AdvService = {
  getById: async (id) => await AdvModel.findById(id),
  all: async () => {
    let advs = null;
    try {
      advs = await AdvModel.find();
    } catch (error) {
      console.log("Get advs in error", error);
    } finally {
      return advs;
    }
  },
  add: async (obj) => {
    let newAdv = null;
    try {
      newAdv = await new AdvModel(obj).save();
    } catch (error) {
      console.log("Adv Create Error", error);
    } finally {
      return newAdv;
    }
  },
  update: async (id, data) =>
    await AdvModel.findByIdAndUpdate(id, data, { new: true }),
  drop: async (id) => {
    await AdvModel.findByIdAndDelete(id);
  },
};

export default AdvService;
