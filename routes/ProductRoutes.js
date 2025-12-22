const express = require('express')
const productController = require("../controller/ProductController");
const {requireRoleOrHigher} = require("../validation/RoleValidation");
const {authValidate, csrfValidate} = require("../validation/AuthValidator");

const router = express.Router()

router.route("/")
    .get(productController.getProductsByPage)
router.route("/:id")
    .get(productController.getProductById)
router.route("/")
    .post(authValidate, requireRoleOrHigher('producer'), csrfValidate, productController.saveProduct)
router.route("/")
    .put(authValidate, requireRoleOrHigher('producer'), csrfValidate, productController.updateProduct)
router.route("/:id")
    .delete(authValidate, requireRoleOrHigher('producer'), csrfValidate, productController.deleteProductById)

module.exports = router