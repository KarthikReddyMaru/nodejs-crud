/**
 * @param {import('express').Request} req
 * @param {import('express').Response} _res
 * @param {import('express').NextFunction} next
 */
const ErrorResponse = require("../util/ErrorResponse");

exports.authValidate = (req, _res, next) => {
    const session = req.session.user;
    console.log(session)
    if (!session)
        return next(new ErrorResponse('Unauthenticated', 401));
    next();
}