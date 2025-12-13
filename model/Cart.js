const Sequelize = require('sequelize')

module.exports = (sequelize) => {
    const Cart = sequelize.define('cart', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        }
    })

    Cart.associate = (models) => {
        Cart.belongsToMany(models.Product, {
            through: models.Cart_Item,
            foreignKey: 'cart_id',
            as: 'products',
            onDelete: 'SET NULL'
        })
    }

    return Cart;
}