import { Product } from "../models/product.js";
import fs from "node:fs/promises";
import path from "node:path";

export async function getProducts(req, res, next) {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (error) {
    next(error);
  }
}
export async function createProducts(req, res, next) {
  try {
    const data = await Product.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;

    const data = await Product.findByIdAndDelete(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;

    const data = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function updateProductSale(req, res, next) {
  try {
    const { id } = req.params;

    const data = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      projection: { sale: 1 },
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function updateProductImages(req, res, next) {
  try {
    //           {
    //     fieldname: 'productImages',
    //     originalname: 'cg@2x.jpg',
    //     encoding: '7bit',
    //     mimetype: 'image/jpeg',
    //     destination: '/Users/liudmylabykova/Desktop/projects/practice_1805/temp',
    //     filename: '665b24b86302afaeeb70ebb2_10cbc158-79b6-4657-bcde-7fa9c85926d1.jpg',
    //     path: '/Users/liudmylabykova/Desktop/projects/practice_1805/temp/665b24b86302afaeeb70ebb2_10cbc158-79b6-4657-bcde-7fa9c85926d1.jpg',
    //     size: 28235
    //   }
    const { id } = req.params;
    const createNewPath = (filename) =>
      path.resolve("public", "products", filename);

    const promisArray = req.files.map(async (file) => {
      await fs.rename(file.path, createNewPath(file.filename));
      return path.join("products", file.filename);
    });

    const promisResult = await Promise.allSettled(promisArray);

    const productImagesURL = promisResult.map((product) => product.value);

    const product = await Product.findByIdAndUpdate(
      id,
      {
        images: productImagesURL,
      },
      { new: true }
    );
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}
