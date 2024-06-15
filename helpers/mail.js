import nodemailer from "nodemailer";
import "dotenv/config";

export const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAIL_LOGIN,
        pass: process.env.MAIL_PASSWORD,
    },
});
