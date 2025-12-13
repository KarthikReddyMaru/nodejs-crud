const {addToCart, getCart, deleteFromCart} = require("../controller/CartController");
const router = require('express').Router();

router.get("/cart", getCart)
router.post("/cart/:productId", addToCart)
router.delete("/cart/:productId", deleteFromCart)

module.exports = router