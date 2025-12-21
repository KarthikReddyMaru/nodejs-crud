const Product = require('../model/Product')
const Cart = require('../model/Cart')
const ErrorResponse = require("../util/ErrorResponse");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.addToCart = async (req, res, next) => {
    try {
        const {productId, quantity} = req.body;

        const product = await Product.findById(productId).lean();
        if (!product)
            return next(new ErrorResponse('Product not found', 400));

        const cart = await Cart.findOneAndUpdate(
            {userId: req.user._id},
            {$setOnInsert: {products: []}},
            {upsert: true, new: true});

        const productInCart = cart.products.findIndex(item => item.product._id.toString() === productId);
        if (productInCart === -1) {
            cart.products.push({
                product: productId,
                quantity: parseInt(quantity),
                price: product.price * parseInt(quantity)
            });
        } else {
            const existingProduct = cart.products[productInCart];
            existingProduct.quantity += parseInt(quantity);
            existingProduct.price = existingProduct.quantity * product.price;
        }
        const updatedCart = await cart.save();

        return res.status(201).json({
            products: updatedCart.products
        });

    } catch (e) {
        next(e)
    }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.removeFromCart = async (req, res, next) => {

    const {productId, quantity} = req.body;
    const product = await Product.findById(productId).lean();
    if (!product)
        return next(new ErrorResponse('Product not found', 400));

    const update = parseInt(quantity) > 0 ?
        { $set: { "products.$.quantity": parseInt(quantity), "products.$.price": parseInt(quantity) * product.price } } :
        { $pull: { products: { product: productId } } };

    const cart = await Cart.findOneAndUpdate({ userId: req.user._id, "products.product": productId }, update, {new: true, lean: true});
    return res.status(200).json(cart);
}