import AdvService from "../services/adv_service.js";
import { Msg, deleteImageByLink } from "../utils/facade.js";

const AdvController = {
  all: async (req, res, next) => {
    let result = await AdvService.all();
    Msg(res, "All Advertisements", result);
  },
  allActives: async (req, res, next) => {
    let result = await AdvService.allActives();
    Msg(res, "All active advs", result);
  },
  add: async (req, res, next) => {
    let obj = {
      image: req.body.image,
      content: req.body.content,
    };
    let result = await AdvService.add(obj);
    Msg(res, "Advertisement Created !", result);
  },
  update: async (req, res, next) => {
    let id = req.params.id;
    let data = {};
    if (req.body.image) data["image"] = req.body.image;
    if (req.body.status) data["status"] = req.body.status;
    if (req.body.content) data["content"] = req.body.content;

    let dbAdv = await AdvService.getById(id);
    if (dbAdv) {
      deleteImageByLink(dbAdv.image);
      let result = await AdvService.update(id, data);
      Msg(res, "Adv Updated !", result);
    } else {
      next(new Error("Adv Update Error"));
    }
  },
  drop: async (req, res, next) => {
    let id = req.params.id;
    let dbAdv = await AdvService.getById(id);
    if (dbAdv) {
      await AdvService.drop(dbAdv._id);
      deleteImageByLink(dbAdv.image);
      Msg(res, "Adv Deleted !", {});
    } else {
      next(new Error("No Advertisement with that id"));
    }
  },
};

export default AdvController;
