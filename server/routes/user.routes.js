import express from "express";
import {
  createUser,
  getUsers,
  loginUser,
  verifyToken,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/users", createUser);
userRouter.get("/users", authMiddleware, getUsers);
userRouter.post("/login", loginUser);
userRouter.get("/verify", authMiddleware, verifyToken);

export default userRouter;
