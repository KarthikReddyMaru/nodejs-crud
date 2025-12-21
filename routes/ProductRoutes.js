const express = require('express')
const productController = require("../controller/ProductController");


const router = express.Router()

router.route("/")
    .get(productController.getProductsByPage)
router.route("/:id")
    .get(productController.getProductById)
router.route("/")
    .post(productController.saveProduct)
router.route("/")
    .put(productController.updateProduct)
router.route("/:id")
    .delete(productController.deleteProductById)

module.exports = router