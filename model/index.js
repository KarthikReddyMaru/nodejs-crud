const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('ecom_nodejs', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
})

const models = {
    Product: require('./Product')(sequelize),
    Cart: require('./Cart')(sequelize),
    Cart_Item: require('./Cart_Item')(sequelize)
}

Object
    .values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models))

exports.sequelize = sequelize;
exports.models = models