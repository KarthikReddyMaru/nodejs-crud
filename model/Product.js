const Sequelize = require('sequelize')

const sequelize = require('../repository/database')

module.exports = sequelize.define('product', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})