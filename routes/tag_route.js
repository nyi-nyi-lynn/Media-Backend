import Controller from "../controllers/tag_controller.js";
import express from "express";
import { validateBody, validateRole, validateToken } from "../utils/facade.js";
import TagSchema from "../utils/schemas/tag_schema.js";

const Router = express.Router();

Router.get("/", Controller.getAll);
Router.get("/:id", Controller.getSingle);
Router.post(
  "/",
  validateToken,
  validateRole(0),
  validateBody(TagSchema.add),
  Controller.post,
);
Router.patch(
  "/:id",
  validateToken,
  validateRole(0),
  validateBody(TagSchema.patch),
  Controller.patch,
);
Router.delete("/:id", validateToken, validateRole(0), Controller.delete);
export default Router;
