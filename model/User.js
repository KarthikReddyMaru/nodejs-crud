const Sequelize = require('sequelize')

/**
 *
 * @param {import('./index').sequelize} sequelize
 */
module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            index: true,
            unique: true
        }
    })

    /**
     *
     * @param {import('./index').models} models
     */
    User.associate = (models) => {
        User.hasOne(models.Cart, {
            as: 'cart',
            foreignKey: 'user_id'
        })

        User.hasMany(models.Order, {
            as: 'orders',
            foreignKey: 'user_id'
        })
    }

    return User;
}
