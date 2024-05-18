import { Product } from "../models/product.js";

export async function getProducts(req, res, next) {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (error) {
    next(error);
  }
}
