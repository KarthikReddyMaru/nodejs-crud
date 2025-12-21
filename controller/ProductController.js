const Product = require("../model/Product");
const ErrorResponse = require("../util/ErrorResponse");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.getProductsByPage = async (req, res) => {
    const page = Math.max(parseInt(req.query.page ?? '1', 10), 1);
    const size = Math.max(parseInt(req.query.size ?? '10', 10), 1);
    const products = await Product.find({}, "-_id -__v", {
        lean: true,
        sort: {name: 1},
        limit: size,
        skip: (page - 1) * size,
    })
    return res.status(200).send(products)
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getProductById = async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product
        .findById(productId, "-__v", { lean: true })
    if (!product)
        return next(ErrorResponse('No product found', 404))
    res.status(200).send(product)
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.saveProduct = async (req, res, next) => {
    try {
        const {name, price, quantity} = req.body;
        const document = await Product.create([{name, price, quantity}]);
        if (!document) return next(new ErrorResponse('Failed to create product', 500))
        return res.status(201).json({
            id: document._id,
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
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.updateProduct = async (req, res, next) => {
    const id = req.body.id;
    const {name, price, quantity} = req.body;
    try {
        const product = await Product
            .findByIdAndUpdate(
                id,
                {name, price, quantity},
                {
                    new: true,
                    upsert: false
                }
            )
        return res.status(201).json(product);
    } catch (e) {
        next(e);
    }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.deleteProductById = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Product.findByIdAndDelete(id, {});
        return res.sendStatus(204);
    } catch (e) {
        next(e);
    }
}