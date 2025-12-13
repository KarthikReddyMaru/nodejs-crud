const ErrorResponse = require("../util/ErrorResponse");
const {Product, CartItem, Cart} = require('../model/index').models

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getCart = async (req, res, next) => {
    const user = req.user;

    // const cart = await Cart.findOne({where: {user_id: user.id}});
    // const products = await cart.getProducts({
    //     attributes: ['name', 'price'],
    //     joinTableAttributes: ['quantity']
    // });
    // console.log(products.map(product => product.toJSON()))

    const cartItems = await Cart.findOne({
        where: {user_id: user.id},
        include: {
            model: Product,
            as: 'products',
            attributes: ['id', 'name', 'price'],
            through: {
                attributes: ['quantity']
            }
        }
    });
    const products = [];
    let cartValue = 0;
    cartItems.products.map(product => {
        products.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.cart_item.quantity
        })
        cartValue += product.cart_item.quantity * product.price;
    })
    return res.json({
        cart: {
            products: products,
            value: cartValue
        }
    })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.addToCart = async (req, res, next) => {
    try {
        const user = req.user;
        const productId = req.params.productId;
        const product = await Product.findByPk(productId);
        if (!product)
            return next(new ErrorResponse('No product found', 404));
        const cart = await Cart.findOne({where: {user_id: user.id}})
        const [item, created] = await CartItem.findOrCreate({
            where: {
                cart_id: cart.id,
                product_id: productId
            }
        })
        if (!created) {
            await item.increment('quantity', {by: 1});
            await item.reload();
        }
        const result = item.get({plain: true});
        return res.status(201).json({
            cart_id: result.cart_id,
            product_id: result.product_id,
            quantity: result.quantity
        })
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
exports.deleteFromCart = async (req, res, next) => {
    const productId = req.params.productId;
    const user = req.user;

    const cart = await Cart.findOne({
        where: {user_id: user.id}
    });
    const products = await cart.getProducts();
    await products.find(product => product.id === productId).destroy();
    res.sendStatus(204);
}