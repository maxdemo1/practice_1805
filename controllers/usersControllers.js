import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generator from "generate-password";
import "dotenv/config";

import { User } from "../models/user.js";
import { createError } from "../helpers/createError.js";
import { transport } from "../helpers/mail.js";

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

export const refreshPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
      throw createError(400, "Not find email");
    }

    const newPassword = generator.generate({
      length: 10,
      numbers: true,
    });

    const hashPass = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(user._id, { password: hashPass });

    await transport.sendMail({
      from: process.env.UKR_NET_MAIL_LOGIN, // sender address
      to: user.email, // list of receivers
      subject: "Refresh Password", // Subject line
      // text: `Password: ${newPassword}`, // plain text body
      html: `<b>Password: ${newPassword}</b>`, // html body
    });

    res.send({ message: "Password updated" });
  } catch (error) {
    next(error);
  }
};

export const refreshPasswordCustom = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
      throw createError(400, "Not found email");
    }
    const passwordRestoringToken = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    await User.findByIdAndUpdate(user._id, { passwordRestoringToken });

    const restoringLink = `http://localhost:5173/password?token=${passwordRestoringToken}`;

    await transport.sendMail({
      from: process.env.UKR_NET_MAIL_LOGIN, // sender address
      to: user.email, // list of receivers
      subject: "Password refresh", // Subject line
      // text: `Password: ${newPassword}`, // plain text body
      html: `<b>To refresh your password follow the link: ${restoringLink}</b>`, // html body
    });

    res.send({ message: "Check your email to uprate password" });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  console.log({ body: req.body, user: req.user });
  const user = req.user;
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    await User.findByIdAndUpdate(user._id, { password });
    res.status(204);
  } catch (error) {
    next(error);
  }
  res.send("ok");
};
