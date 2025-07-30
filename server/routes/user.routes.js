import express from "express";
import {
  createUser,
  getUsers,
  loginUser,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/users", createUser);
userRouter.get("/users", authMiddleware, getUsers); // Protected route
userRouter.post("/login", loginUser);

export default userRouter;
