const express = require('express')
const productController = require("../controller/ProductController");
const {authValidate} = require("../validation/AuthValidator");


const router = express.Router()

router.route("/")
    .get(authValidate, productController.getProductsByPage)
router.route("/:id")
    .get(productController.getProductById)
router.route("/")
    .post(authValidate, productController.saveProduct)
router.route("/")
    .put(productController.updateProduct)
router.route("/:id")
    .delete(productController.deleteProductById)

module.exports = router