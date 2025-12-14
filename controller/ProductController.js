const express = require('express')
const Product = require("../model/Product");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
exports.getProductById = (req, res, next) => {
    const productId = req.params.id;
    res.status(200).send(`Product ${productId}`)
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
    }
    catch (e) {
        next(e);
    }
}