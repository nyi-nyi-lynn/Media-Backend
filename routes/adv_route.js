import { Router } from "express";
import AdvController from "../controllers/adv_controller.js";
import {
  saveSingleFile,
  validateRole,
  validateToken,
} from "../utils/facade.js";

const router = Router();

const checkFileExist = (req, res, next) => {
  if (req.files) {
    if (req.files.file) {
     saveSingleFile(req,res,next);
    } else {
      next();
    }
  } else {
    next();
  }
};

router.get("/", AdvController.all);
router.post(
  "/",
  validateToken,
  validateRole(0),
  saveSingleFile,
  AdvController.add,
);
router.patch("/:id", validateToken, validateRole(0),checkFileExist, AdvController.update);
router.delete("/:id", validateToken, validateRole(0), AdvController.drop);
export default router;
