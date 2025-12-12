const {Sequelize} = require('sequelize')

module.exports = new Sequelize('ecom_nodejs', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
})