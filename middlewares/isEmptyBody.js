export function isEmptyBody(req, res, next) {
    try {
        if (!Object.keys(req.body).length) {
            throw createError(400, "Body is empty");
        }
    } catch (error) {
        next(error);
    }
}
