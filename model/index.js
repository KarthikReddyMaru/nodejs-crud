const mongoose = require('mongoose')
const path = require("node:path");
const dotenv = require('dotenv').config({path: path.join(require.main.path, ".env")})

const user = encodeURIComponent(dotenv.parsed.MONGO_USERNAME);
const pass = encodeURIComponent(dotenv.parsed.MONGO_PASSWORD);
const database = process.env.MONGO_DATABASE


const uri = `mongodb+srv://${user}:${pass}@ecom-nodejs.nnmaxt3.mongodb.net/`;

mongoose.connect(uri, {
    dbName: database
}).then(mongoose => {
    console.log("Mongo connected");
}).catch(e => {
    console.log(e)
    process.exit(1);
})

module.exports = uri;