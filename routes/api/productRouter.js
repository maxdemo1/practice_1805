import express from "express";
import { getProducts } from "../../controllers/productsControllers.js";

export const productRouter = express.Router();

productRouter.get("/", getProducts);
