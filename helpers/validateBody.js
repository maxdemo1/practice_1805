import { createError } from "./createError.js";

export function validateBody(schema) {
    return function (req, res, next) {
        try {
            const { error } = schema.validate(req.body);
            if (error) {
                throw createError(400, error.message);
            }

            next();
        } catch (error) {
            next(error);
        }
    };
}
