import Service from "../services/tag_service.js";
import { Msg } from "../utils/facade.js";

const TagController = {
  getAll: async (req, res, next) => {
    let tags = await Service.all();
    Msg(res, "All Tags", tags);
  },

  getSingle: async (req, res, next) => {
    let id = req.params.id;
    let tag = await Service.getById(id);
    Msg(res,"Single Tag",tag);
  },
  post: async (req, res, next) => {
    let name = req.body.name.toLowerCase();
    let dbTag = await Service.getByName(name);
    if (dbTag) {
      return next(new Error(" Tag already exist with that name"));
    }
    let newTag = await Service.add(name);
    Msg(res, "Tag Created", newTag);
  },
  patch: async (req, res, next) => {
    let obj = req.body;
    let id = req.params.id;
    let dbTag = await Service.getById(id);
    if (!dbTag) {
      return next(new Error("No Tag with that name"));
    }
    let updated = await Service.modify(id, obj);
    Msg(res, "Tag Updated", updated);
  },
  delete: async (req, res, next) => {
    let id = req.params.id;
    let dbTag = await Service.getById(id);
    if (!dbTag) {
      return next(new Error("No Tag With that name"));
    }

    let deleted = await Service.drop(id);
    Msg(res, "Tag Deleted", deleted);
  },
};

export default TagController;
