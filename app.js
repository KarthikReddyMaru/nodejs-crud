const express = require('express')

const productRoutes = require('./routes/ProductRoutes')
const authenticationRoutes = require('./routes/AuthenticationRoutes')
const { sequelize } = require('./model/index');
const {errorHandler} = require("./controller/ErrorController");

const app = express()
const PORT = 9090

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(authenticationRoutes)
app.use(productRoutes)

app.use(errorHandler)

app.listen(PORT, async () => {

    console.log(`Server started at ${PORT}`);

    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync({});
    console.log("Tables synced");
})