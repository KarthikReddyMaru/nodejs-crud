const express = require('express')

const { Product } = require('../model/index').models
const ErrorResponse = require("../util/ErrorResponse");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
exports.getProductById = async (req, res, next) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByPk(productId);
        if (!product)
            next(new ErrorResponse("No product found", 404));
        else
            res.send(product);
    } catch (e) {
        next(e);
    }
}

/**
 * @typedef {Object} ProductRequest
 * @property {string} name
 * @param {express.Request<ProductRequest>} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
exports.saveProduct = async (req, res, next) => {
    const productName = req.body.name;
    try {
        const result = await Product.create({name: productName});
        res.send(result);
    } catch (e) { next(e); }
}