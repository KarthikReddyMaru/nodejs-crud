const ErrorResponse = require("../util/ErrorResponse");

/**
 *
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports = (err, req, res, next) => {
    let status = 500;
    if (err instanceof ErrorResponse)
        status = err.status;
    return res.status(status).json({
        path: req.path,
        message: err.message,
        timestamp: new Date().toISOString()
    })
}