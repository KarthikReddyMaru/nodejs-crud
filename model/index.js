const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('ecom_nodejs', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
})

const Product = require('./Product')(sequelize);
const Cart = require('./Cart')(sequelize);
const CartItem = require('./CartItem')(sequelize);
const User = require('./User')(sequelize);
const Order = require('./Order')(sequelize);
const OrderItem = require('./OrderItem')(sequelize);

/**
 * @typedef {Object} Models
 * @property {typeof Product} Product
 * @property {typeof Cart} Cart
 * @property {typeof CartItem} CartItem
 * @property {typeof User} User
 * @property {typeof Order} Order
 * @property {typeof OrderItem} OrderItem
 */

/**
 * @type {Models}
 */
const models = { Product, Cart, CartItem, User, Order, OrderItem }

Object
    .values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models))

exports.sequelize = sequelize;
exports.models = models