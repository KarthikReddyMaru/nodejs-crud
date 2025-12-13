const routes = require('express').Router()
const { User, Cart } = require('../model/index').models

routes.use(async (req, res, next) => {
    try {
        const [user, created] = await User.findOrCreate({
            where: {email: 'beastboy@example.com'},
            defaults: {
                name: 'Beast Boy'
            }
        });
        req.user = user.get({plain: true});
        await Cart.findOrCreate({
            where: {user_id: req.user.id}
        })
        return next();
    } catch (e) { next(e) }
})

module.exports = routes;