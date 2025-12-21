const router = require('express').Router()

const {addToCart, removeFromCart} = require("../controller/CartController");

router.route("/")
    .post(addToCart);
router.route("/")
    .put(removeFromCart)

module.exports = router;