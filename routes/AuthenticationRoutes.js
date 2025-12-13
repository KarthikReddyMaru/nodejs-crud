const routes = require('express').Router()
const { User } = require('../model/index').models

routes.use(async (req, res, next) => {
    try {
        req.user = await User.findOrCreate({
            where: {email: 'beastboy@example.com'},
            defaults: {
                name: 'Beast Boy'
            }
        });
        return next();
    } catch (e) { next(e) }
})

module.exports = routes;