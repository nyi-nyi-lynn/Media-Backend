import { Router } from "express";
import { validateToken,saveSingleFile ,validateBody,userSchema} from "../utils/facade.js";
import AdvController from "../controllers/adv_controller.js";
import CategoryController from "../controllers/category_controller.js";
import CommentController from "../controllers/comment_controller.js";
import PostController from "../controllers/post_controller.js";
import TagController from "../controllers/tag_controller.js";
import UserController from "../controllers/user_controller.js"
const router = Router();

//adv
router.get("/advs/all", AdvController.allActives);

//category
router.get("/categories/all",CategoryController.get);

//comments
router.get("/cmmts/:postId", validateToken, CommentController.all);
router.post("/cmmts/:postId", validateToken, saveSingleFile, CommentController.add);

//posts
router.get("/posts/:index", PostController.get);
router.get("/posts/tag/:id/:index", PostController.getByTag);
router.get("/posts/cat/:id/:index",PostController.getByCat);
router.get("/posts/author/:id/:index",PostController.getByAuthor);

//tags
router.get("/tags/all", TagController.getAll);
router.get("/tags/single/:id", TagController.getSingle);

//users
router.post(
  "/users/register",
  validateBody(userSchema.register),
  UserController.register,
);
router.post("/users/login", validateBody(userSchema.login), UserController.login);
router.get("/users/getme", validateToken, UserController.getme);


export default router;
