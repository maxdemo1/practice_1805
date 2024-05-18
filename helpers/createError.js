export function createError(status, message) {
    const newError = new Error(message);

    newError.status = status;

    return newError;
}
