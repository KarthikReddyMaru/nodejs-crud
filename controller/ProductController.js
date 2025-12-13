const express = require('express')

const { sequelize } = require('../model/index')
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
        const product = await Product.findByPk(productId, {
            attributes: ['id', 'name', 'price', 'quantity']
        });
        if (!product)
            return next(new ErrorResponse("No product found", 404));
        return res.send(product);
    } catch (e) {
        next(e);
    }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
exports.saveProduct = async (req, res, next) => {
    const productName = req.body.name;
    const productPrice = req.body.price;
    const productQuantity = req.body.quantity;
    try {
        const result = await sequelize.transaction(async (transaction) => {
            return Product.create({
                name: productName,
                price: productPrice,
                quantity: productQuantity
            }, { transaction } )
        })
        return res.json({
            id: result.id,
            name: result.name,
            price: result.price,
            quantity: result.quantity
        })
    } catch (e) { next(e); }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
exports.updateProduct = async (req, res, next) => {
    const {id, name, price, quantity} = req.body;
    const product = await Product.findByPk(id, {
        attributes: ['id', 'name', 'price', 'quantity']
    });
    if (!product) return next(new ErrorResponse('No Product found', 404));
    const result = await product.update({
        name: name,
        price: price,
        quantity: quantity
    })
    res.status(201).json({
        name: result.name,
        price: result.price,
        quantity: result.quantity
    });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
exports.deleteProductById = async (req, res, next) => {
    const productId = req.params.id;
    try {
        const rowsModified = await Product.destroy({
            where: {
                id: productId
            }
        })
        if (!rowsModified) return next(new ErrorResponse('No product found', 404));
        return res.sendStatus(204);
    } catch (e) {
        next(e);
    }
}