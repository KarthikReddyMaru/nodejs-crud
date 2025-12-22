/**
 *
 * @param {string} requiredRole
 */
const ErrorResponse = require("../util/ErrorResponse");
const roleWeights = {
    'consumer': 1,
    'producer': 2
}

exports.requireRoleOrHigher = (requiredRole) => {
    return (req, res, next) => {
        const session = req.session.user;
        if (session) {
            const role = session.role;
            if (!role || roleWeights[role] < roleWeights[requiredRole])
                return next(new ErrorResponse('Access denied!', 403));
        }
        return next();
    }
}