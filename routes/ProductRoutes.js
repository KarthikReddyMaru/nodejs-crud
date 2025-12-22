const express = require('express')
const productController = require("../controller/ProductController");


const routes = express.Router()

routes.get("/", productController.getProductsByPage)
routes.get("/:id", productController.getProductById)
routes.post("/", productController.saveProduct)
routes.put("/", productController.updateProduct)
routes.delete("/:id", productController.deleteProductById)

module.exports = routes