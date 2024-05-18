import { isValidObjectId } from "mongoose";
import { createError } from "../helpers/createError.js";

export function isValidId(req, res, next) {
    try {
        const { id } = req.params;

        const isValid = isValidObjectId(id);

        if (!isValid) {
            throw createError(400, "Invalid ID");
        }

        next();
    } catch (error) {
        next(error);
    }
}
