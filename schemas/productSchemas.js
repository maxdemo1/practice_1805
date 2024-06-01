import Joi from "joi";

export const addProductSchema = Joi.object({
  name: Joi.string().min(2).required(),
  price: Joi.number().required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(2),
  price: Joi.number(),
});

export const updateProductSaleSchema = Joi.object({
  sale: Joi.number().min(0).max(100).required(),
});
