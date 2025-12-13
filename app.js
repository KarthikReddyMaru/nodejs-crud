const express = require('express')

const routes = require('./routes/ProductRoutes')
const app = express()
const PORT = 9090

app.use(routes)

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})