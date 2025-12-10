const express = require('express')

const app = express()
const PORT = 8080

app.use('/', (req, res, next) => {
    res.send("Hello world")
})

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})