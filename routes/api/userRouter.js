import express from "express";
import { loginUser, refreshPassword, registerUser } from "../../controllers/usersControllers.js";
import { validateBody } from "../../helpers/validateBody.js";
import { createUserSchemas, loginUserSchemas, refreshPasswordUserSchemas } from "../../schemas/userSchemas.js";

export const userRouter = express.Router();

userRouter.post("/register", validateBody(createUserSchemas), registerUser);
userRouter.post("/login", validateBody(loginUserSchemas), loginUser);
userRouter.post("/refresh/password", validateBody(refreshPasswordUserSchemas), refreshPassword);
