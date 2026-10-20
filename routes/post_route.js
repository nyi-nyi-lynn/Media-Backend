import PostController from "../controllers/post_controller.js";
import { Router } from "express";
import {
  saveMultipleFile,
  validateBody,
  validateRole,
  validateStaff,
  validateToken,
} from "../utils/facade.js";
import PostSchema from "../utils/schemas/post_schema.js";
const router = Router();

router.post(
  "/",
  validateToken,
  validateRole(1),
  validateBody(PostSchema.add),
  saveMultipleFile,
  PostController.add,
);
router.get("/:index", PostController.get);
router.get("/tag/:id/:index", PostController.getByTag);
router.get("/cat/:id/:index",PostController.getByCat);
router.get("/author/:id/:index",PostController.getByAuthor);
router.patch(
  "/:id",
  validateToken,
  validateRole(1),
  saveMultipleFile,
  PostController.update,
);
router.delete("/:id", validateToken, validateStaff, PostController.delete);

export default router;
