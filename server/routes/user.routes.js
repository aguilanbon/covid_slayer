import express from "express";
import { createUser, getUsers } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/users", createUser);
userRouter.get("/users", getUsers);

export default userRouter;
