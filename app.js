const express = require('express')
const session = require('express-session')
const MongoStore = require("connect-mongo").default;
const MONGO_URI = require('./model/index')

const app = express()
const PORT = 9090
const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(express.json())
app.use(session({
    secret:SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: MONGO_URI + 'ecom',
        collectionName: 'sessions',
        ttl: 24 * 60 * 60,
        autoRemove: 'native',
    }),
    cookie: {
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true
    }
}))

const authRoutes = require("./routes/AuthRoutes");
app.use("/auth", authRoutes);

const productRoutes = require('./routes/ProductRoutes')
app.use("/products", productRoutes)

const cartRoutes = require('./routes/CartRoutes')
app.use("/cart", cartRoutes);

const errorHandler = require('./controller/ErrorController')
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})