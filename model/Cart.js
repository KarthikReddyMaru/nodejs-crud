const { Sequelize } = require('sequelize')

/**
 *
 * @param {import('./index').sequelize} sequelize
 */
module.exports = (sequelize) => {
    const Cart = sequelize.define('cart', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        }
    })

    /**
     *
     * @param {import('./index').Models} models
     */
    Cart.associate = (models) => {

        Cart.belongsToMany(models.Product, {
            through: models.CartItem,
            foreignKey: 'cart_id',
            as: 'products',
            onDelete: 'SET NULL'
        });
    }

    return Cart;
}