import nodemailer from "nodemailer";
import "dotenv/config";

export const transport = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.UKR_NET_MAIL_LOGIN,
    pass: process.env.UKR_NET_MAIL_PASSWORD,
  },
});
