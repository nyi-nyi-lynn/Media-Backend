import express from "express";
import Controller from "../controllers/category_controller.js";
import {
  saveSingleFile,
  validateRole,
  validateToken,
} from "../utils/facade.js";
const Router = express.Router();

Router.get("/", Controller.get);
Router.post(
  "/",
  validateToken,
  validateRole(0),
  saveSingleFile,
  Controller.post,
);
Router.patch("/:id", validateToken, validateRole(0), Controller.patch);
Router.delete("/:id", validateToken, validateRole(0), Controller.delete);

export default Router;
