import express from "express";
import multer from "multer";

import {
  createProducts,
  deleteProduct,
  getProducts,
  updateProduct,
  updateProductImages,
  updateProductSale,
} from "../../controllers/productsControllers.js";
import { isValidId } from "../../middlewares/isValidId.js";
import { validateBody } from "../../helpers/validateBody.js";
import {
  addProductSchema,
  updateProductSaleSchema,
  updateProductSchema,
} from "../../schemas/productSchemas.js";
import { isEmptyBody } from "../../middlewares/isEmptyBody.js";
import { authenticate } from "../../middlewares/authenticate.js";
import uploadFiles from "../../middlewares/uploadFiles.js";

export const productRouter = express.Router();

// productRouter.use(authenticate);

productRouter.get("/", getProducts);
productRouter.post("/", validateBody(addProductSchema), createProducts);
productRouter.delete("/:id", isValidId, deleteProduct);
productRouter.patch(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(updateProductSchema),
  updateProduct
);
productRouter.patch(
  "/:id/sale",
  isValidId,
  validateBody(updateProductSaleSchema),
  updateProductSale
);
productRouter.patch(
  "/:id/images",
  isValidId,
  uploadFiles.array("productImages", 8),
  updateProductImages
);
