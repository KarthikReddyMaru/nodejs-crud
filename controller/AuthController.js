const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const User = require('../model/User');
const ErrorResponse = require("../util/ErrorResponse");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.dummyAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({}, {}, {lean: true});
        if (!user) {
            crypto.randomBytes(32, (err, buf) => {
                const password = buf.toString('base64');
                return bcrypt.hash(password, 12)
                    .then(hashedPassword => {
                        return User.create({
                            email: 'test@test.com',
                            password: hashedPassword
                        });
                    }).then(user => {
                        req.user = user;
                    })
                    .catch(e => next(e));
            });
        } else req.user = user;
        next();
    } catch (e) {
        next(new ErrorResponse('User creation failed', 500));
    }
}