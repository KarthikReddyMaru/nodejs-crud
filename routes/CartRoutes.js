const router = require('express').Router()

const {addToCart, removeFromCart} = require("../controller/CartController");
const {authValidate} = require("../validation/AuthValidator");

router.route("/")
    .post(authValidate, addToCart);
router.route("/")
    .put(authValidate, removeFromCart)

module.exports = router;