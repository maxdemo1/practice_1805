import express from "express";
import { loginUser, registerUser } from "../../controllers/usersControllers.js";
import { validateBody } from "../../helpers/validateBody.js";
import {
  createUserSchemas,
  loginUserSchemas,
} from "../../schemas/userSchemas.js";

export const userRouter = express.Router();

userRouter.post("/register", validateBody(createUserSchemas), registerUser);
userRouter.post("/login", validateBody(loginUserSchemas), loginUser);
