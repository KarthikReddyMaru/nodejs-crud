const express = require('express')

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
exports.saveProduct = (req, res, next) => {
    res.status(201).send("Product created...")
}