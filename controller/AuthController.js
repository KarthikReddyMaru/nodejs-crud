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
exports.basicAuth = async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if (!authHeader) { return next(new ErrorResponse('Unauthenticated', 401)); }
        const encodedCredentials = authHeader.split(' ')[1];
        const [email, password] = Buffer.from(encodedCredentials, 'base64').toString('utf8').split(':');
        const user = await User.findOne({ email: email }, 'role password', {lean: true});
        if (!user || !(await bcrypt.compare(password, user.password)))
            return next(new ErrorResponse('Unauthenticated', 401));
        const csrfToken = await new Promise((resolve, reject) => {
            crypto.randomBytes(32, (err, buf) => {
                if (!err)
                    return resolve(buf.toString('hex'));
                return reject(err);
            });
        });
        console.log(`user - ${email} - CSRF - ${csrfToken}`);
        req.session.user = {_id: user._id, role: user.role, csrf: csrfToken};
        return res.status(200).json({success: 'true'});
    } catch (e) {
        next(e);
    }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.register = async (req, res, next) => {
    try {
        const role = req.query.role;
        const {email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({ email, password: hashedPassword, role: role });
        return res.status(201).json(user);
    } catch (e) {
        console.log(e)
        if (e && e.code === 11000)
            e.message = 'Email already exists!';
        next(e);
    }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.logout = async (req, res, next) => {
    const session = req.session;
    try {
        if (session) {
            await new Promise((resolve, reject) => {
                session.destroy((err) => {
                    if (err)
                        return reject(err);
                    return resolve();
                });
            });
        }
        res.clearCookie('connect-sid');
        return res.status(200).json({success: true});
    } catch (e) { return next(new ErrorResponse('logout failed', 500)); }
}