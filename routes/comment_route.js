import { Router } from "express";
import Controller from "../controllers/comment_controller.js";
import {
  saveSingleFile,
  validateRole,
  validateToken,
} from "../utils/facade.js";
const router = Router();

router.get("/:postId", validateToken, Controller.all);
router.post("/:postId", validateToken, saveSingleFile, Controller.add);
router.patch("/:commentId", validateToken, validateRole(0), Controller.modify);
router.delete("/:commentId", validateToken, validateRole(0), Controller.drop);

export default router;
