const Sequelize = require('sequelize')

module.exports = (sequelize) => {

    const Product = sequelize.define('product', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    })

    Product.associate = (models) => {
        Product.belongsToMany(models.Cart, {
            through: models.Cart_Item,
            as: 'carts',
            foreignKey: 'product_id',
            onDelete: 'SET NULL'
        })
    }

    return Product;
}