import express from "express";
import UserController from "../controllers/user_controller.js";
import {
  userSchema,
  validateBody,
  validateRole,
  validateToken,
} from "../utils/facade.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  validateBody(userSchema.register),
  UserController.register,
);
userRouter.post("/login", validateBody(userSchema.login), UserController.login);
userRouter.get("/getme", validateToken, UserController.getme);
userRouter.get(
  "/pagi/:index",
  validateToken,
  validateRole(0),
  UserController.getUsers,
);
userRouter.get(
  "/single/:userid",
  validateToken,
  validateRole(0),
  UserController.getSingleUser,
);
userRouter.post(
  "/changeRole",
  validateToken,
  validateRole(0),
  UserController.changeRole,
);
export default userRouter;
