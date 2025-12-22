const express = require('express')

const app = express()
const PORT = 9090

const productRoutes = require('./routes/ProductRoutes')
const errorHandler = require('./controller/ErrorController')

app.use(express.json())

app.use(productRoutes)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})