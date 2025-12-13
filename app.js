const express = require('express')

const { sequelize } = require('./model/index');
const {errorHandler} = require("./controller/ErrorController");

const authenticationRoutes = require('./routes/AuthenticationRoutes')
const productRoutes = require('./routes/ProductRoutes')
const cartRoutes = require('./routes/CartRoutes')

const app = express()
const PORT = 9090

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(authenticationRoutes)
app.use(productRoutes)
app.use(cartRoutes)

app.use(errorHandler)

app.listen(PORT, async () => {

    console.log(`Server started at ${PORT}`);

    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync({
        // force: true
    });
    console.log("Tables synced");
})