import express from "express";
import {
  changePassword,
  loginUser,
  refreshPassword,
  refreshPasswordCustom,
  registerUser,
} from "../../controllers/usersControllers.js";
import { validateBody } from "../../helpers/validateBody.js";
import {
  createUserSchemas,
  loginUserSchemas,
  passwordUserSchemas,
  refreshPasswordUserSchemas,
} from "../../schemas/userSchemas.js";
import { authenticatePassword } from "../../middlewares/authenticate.js";

export const userRouter = express.Router();

userRouter.post("/register", validateBody(createUserSchemas), registerUser);
userRouter.post("/login", validateBody(loginUserSchemas), loginUser);
userRouter.post(
  "/refresh/password",
  validateBody(refreshPasswordUserSchemas),
  refreshPassword
);
userRouter.post(
  "/refresh/custom",
  validateBody(refreshPasswordUserSchemas),
  refreshPasswordCustom
);

userRouter.post(
  "/refresh/password/new",
  validateBody(passwordUserSchemas),
  authenticatePassword,
  changePassword
);
