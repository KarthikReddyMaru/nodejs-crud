const bcrypt = require('bcryptjs');
const User = require('../model/User')

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.register = async (req, res, next) => {
    try {
        console.log("Okay")
        const {email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({ email, password: hashedPassword });
        return res.status(201).json(user);
    } catch (e) {
        console.log(e)
        if (e && e.code === 11000)
            e.message = 'Email already exists!';
        next(e);
    }
}