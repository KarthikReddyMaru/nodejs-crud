const express = require('express')
const Product = require("../model/Product");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
exports.getProductsByPage = async (req, res, next) => {
    const page = req.query.page;
    const size = req.query.size;
    const products = await Product.find(page, size);
    return res.status(200).send(products)
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
exports.getProductById = async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId)
    res.status(200).send(product)
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
exports.saveProduct = async (req, res, next) => {
    const {id, name, price, quantity} = req.body;
    const product = new Product(id, name, price, quantity);
    try {
        const documentId = await product.save();
        return res.status(201).json({
            id: documentId,
            name: name,
            price: price,
            quantity: quantity
        })
    } catch (e) {
        next(e);
    }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
exports.updateProduct = async (req, res, next) => {
    const {id, name, price, quantity} = req.body;
    const product = new Product(id, name, price, quantity);
    try {
        const updatedProduct = await product.update();
        return res.status(201).json(updatedProduct);
    } catch (e) {
        next(e);
    }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
exports.deleteProductById = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Product.deleteById(id);
        return res.sendStatus(204);
    } catch (e) {
        next(e);
    }
}