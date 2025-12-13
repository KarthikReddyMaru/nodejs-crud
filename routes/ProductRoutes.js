const express = require('express')
const productController = require("../controller/ProductController");
const {getProductsByPage} = require("../controller/ProductController");


const routes = express.Router()

routes.get("/products", getProductsByPage)
routes.get("/products/:id", productController.getProductById)
routes.post("/products", productController.saveProduct)
routes.put("/products", productController.updateProduct)
routes.delete("/products/:id", productController.deleteProductById)

module.exports = routes