const { Sequelize } = require('sequelize')

/**
 *
 * @param {import('./index').sequelize} sequelize
 */
module.exports = (sequelize) => {

    return sequelize.define('cart_item', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        }
    });
}