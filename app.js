import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";

import { productRouter } from "./routes/api/productRouter.js";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.use("/api/products", productRouter);

app.use((req, res, _) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((error, _, res, __) => {
    const { status = 500, message } = error;

    res.status(status).json({ message: message });
});

mongoose
    .connect(process.env.DB_KEY)
    .then(() => {
        console.log("DB connected");
        app.listen(process.env.PORT, () => {
            console.log(`Service started on port ${process.env.PORT}`);
        });
    })
    .catch(() => {
        console.log("DB connection error");
        process.exit(1);
    });
