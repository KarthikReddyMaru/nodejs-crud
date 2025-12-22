const path = require("node:path");
const MongoConnect = require('mongoose')
const dotenv = require('dotenv').config({path: path.join(require.main.path, ".env")})

const user = encodeURIComponent(dotenv.parsed.MONGO_USERNAME);
const pass = encodeURIComponent(dotenv.parsed.MONGO_PASSWORD);

const uri = `mongodb+srv://${user}:${pass}@ecom-nodejs.nnmaxt3.mongodb.net/`;

MongoConnect.connect(uri, {
    dbName: 'ecom'
}).then((mongoose) => {
    console.log("Mongo connected!")
}).catch(err => {
    console.log(err)
})