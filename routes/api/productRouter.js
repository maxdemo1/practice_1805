import express from "express";

import { createProducts, deleteProduct, getProducts, updateProduct, updateProductSale } from "../../controllers/productsControllers.js";
import { isValidId } from "../../middlewares/isValidId.js";
import { validateBody } from "../../helpers/validateBody.js";
import { addProductSchema, updateProductSaleSchema, updateProductSchema } from "../../schemas/productSchemas.js";
import { isEmptyBody } from "../../middlewares/isEmptyBody.js";

export const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", validateBody(addProductSchema), createProducts);
productRouter.delete("/:id", isValidId, deleteProduct);
productRouter.patch("/:id", isValidId, isEmptyBody, validateBody(updateProductSchema), updateProduct);
productRouter.patch("/:id/sale", isValidId, validateBody(updateProductSaleSchema), updateProductSale);
