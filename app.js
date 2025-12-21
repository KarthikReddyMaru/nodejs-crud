const express = require('express')
require('./model/index')

const app = express()
const PORT = 9090


app.use(express.json())

const { dummyAuth } = require("./controller/AuthController");
app.use(dummyAuth);

const productRoutes = require('./routes/ProductRoutes')
app.use("/products", productRoutes)

const cartRoutes = require('./routes/CartRoutes')
app.use("/cart", cartRoutes);

const errorHandler = require('./controller/ErrorController')
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})