const { MongoClient } = require('mongodb')
const path = require("node:path");
const dotenv = require('dotenv').config({path: path.join(require.main.path, ".env")})

const user = encodeURIComponent(dotenv.parsed.MONGO_USERNAME);
const pass = encodeURIComponent(dotenv.parsed.MONGO_PASSWORD);

const uri = `mongodb+srv://${user}:${pass}@ecom-nodejs.nnmaxt3.mongodb.net/`;

const MongoConnect = MongoClient.connect(uri, {
    appName: 'ecom-nodejs'
});

module.exports = MongoConnect.then(connect => {
    console.log("Mongo connected!!")
    return connect;
}).catch(e => console.log(e));