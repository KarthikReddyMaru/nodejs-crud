/**
 * @param {import('express').Request} req
 * @param {import('express').Response} _res
 * @param {import('express').NextFunction} next
 */
const ErrorResponse = require("../util/ErrorResponse");

exports.authValidate = (req, _res, next) => {
    const session = req.session.user;
    if (!session)
        return next(new ErrorResponse('Unauthenticated', 401));
    next();
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} _res
 * @param {import('express').NextFunction} next
 */
exports.csrfValidate = (req, _res, next) => {
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method))
        return next();
    const session = req.session.user;
    if (session) {
        const csrfTokenInSession = session.csrf;
        const csrfHeader = req.get('X-CSRF-TOKEN');
        if (csrfHeader !== csrfTokenInSession)
            return next(new ErrorResponse('Invalid CSRF Token', 403));
    }
    return next();
}