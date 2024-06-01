import jwt from "jsonwebtoken";
import { createError } from "../helpers/createError.js";
import { User } from "../models/user.js";

export async function authenticate(req, res, next) {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      throw createError(401, "Authentication failed");
    }

    const [bearer, token] = authToken.split(" ", 2);

    if (bearer !== "Bearer" || !token) {
      throw createError(401, "Authentication failed");
    }

    const { id } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(id);

    if (user === null || user.token !== token) {
      console.log(user.token);
      console.log(token);
      throw createError(401, "Authentication failed");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}
