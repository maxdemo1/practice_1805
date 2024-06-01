import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/user.js";
import { createError } from "../helpers/createError.js";

export const registerUser = async (req, res, next) => {
  try {
    const hashPass = await bcrypt.hash(req.body.password, 10);

    const newUserData = {
      email: req.body.email,
      password: hashPass,
    };

    const newUser = await User.create(newUserData);
    res.send({ email: newUser.email, _id: newUser._id });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
      throw createError(400, "Not valid email or password");
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      throw createError(400, "Not valid email or password");
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    await User.findByIdAndUpdate(user._id, { token });
    res.send({ token, name: user.name, email: user.email });
  } catch (error) {
    next(error);
  }
};
