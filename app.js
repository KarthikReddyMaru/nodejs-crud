const express = require('express')

const app = express()
const PORT = 9090


app.use(express.json())

const authRoutes = require('./routes/AuthRoutes');
app.use("/auth", authRoutes)

const productRoutes = require('./routes/ProductRoutes')
app.use("/products", productRoutes)

const errorHandler = require('./controller/ErrorController')
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})