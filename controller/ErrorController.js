const express = require('express')
const ErrorResponse = require("../util/ErrorResponse");

/**
 * @param {Error} err
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
exports.errorHandler = (err, req, res, next) => {
    let status = 500;
    if (err instanceof ErrorResponse)
        status = err.status;
    console.error(err.stack)
    return res.status(status)
        .json({
            "path": req.path,
            "message": err?.message ?? 'Internal server error',
            "timestamp": new Date().toISOString()
        });
}