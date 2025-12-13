const { Sequelize } = require('sequelize')

/**
 *
 * @param {import('./index').sequelize} sequelize
 */
module.exports = (sequelize) => {
    const Order = sequelize.define('order', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        }
    })

    /**
     *
     * @param {import('./index').Models} models
     */
    Order.associate = (models) => {

        Order.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        })

        Order.belongsToMany(models.Product, {
            through: models.OrderItem,
            foreignKey: 'order_id',
            as: 'products'
        })
    }

    return Order;
}