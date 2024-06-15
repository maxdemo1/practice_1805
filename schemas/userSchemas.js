import Joi from "joi";

export const createUserSchemas = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
});

export const loginUserSchemas = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4),
});

export const refreshPasswordUserSchemas = Joi.object({
    email: Joi.string().email().required(),
});
