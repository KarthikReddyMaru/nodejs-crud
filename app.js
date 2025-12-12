const express = require('express')

const routes = require('./routes/ProductRoutes')
const sequelize = require('./repository/database');
const app = express()
const PORT = 9090

app.use(routes)

app.listen(PORT, () => {
    sequelize.authenticate().then(result => {
        console.log("Database connected");
        console.log(`Server started at ${PORT}`);
    }).catch(err => console.log(err));
})