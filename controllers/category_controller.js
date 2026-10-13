import { model } from "mongoose";
import Service from "../services/category_service.js";
import { deleteImageByLink, Msg } from "../utils/facade.js";

const CategoryController = {
  get: async (req, res, next) => {
    let cats = await Service.all();
    Msg(res, "All Categories", cats);
  },
  post: async (req, res, next) => {
    let { name, image, desc } = req.body;
    let namedCategory = await Service.getByName(name);
    if (namedCategory) {
      next(new Error("Category already exist with that name"));
    }
    let newcat = await Service.add(name, image, desc);
    Msg(res, "Categorie Created", newcat);
  },
  patch: async (req, res, next) => {
    let id = req.params.id;
    let obj = req.body;
    let dbCategory = await Service.getById(id);
    if (!dbCategory) {
      next(new Error("No Category with that name"));
    }
    let result = await Service.modify(id, obj);
    Msg(res, "Category Updated");
  },
  delete: async (req, res, next) => {
    let id = req.params.id;
    let category = await Service.getById(id);
    if (!category) {
      next(new Error("No Category with that name"));
    }
    let result = await Service.drop(id);
    deleteImageByLink(result.image);
    Msg(res, "Category Deleted", result);
  },
};

export default CategoryController;
