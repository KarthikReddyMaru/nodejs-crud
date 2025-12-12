const express = require('express')

const routes = require('./routes/ProductRoutes')
const sequelize = require('./repository/database');
const {errorHandler} = require("./controller/ErrorController");

const app = express()
const PORT = 9090

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(routes)

app.use(errorHandler)

app.listen(PORT, async () => {

    console.log(`Server started at ${PORT}`);

    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync();
    console.log("Tables synced");
})