const express = require('express')
const productController = require("../controller/ProductController");


const routes = express.Router()

routes.get("/products/:id", productController.getProductById)
routes.post("/products", productController.saveProduct)

module.exports = routes