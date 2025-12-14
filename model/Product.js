const mongoConnect = require('../model/index')
const {ObjectId} = require("mongodb");

const ErrorResponse = require("../util/ErrorResponse");

const database = process.env.MONGO_DATABASE
const productsCollection = 'products'

module.exports = class Product {

    constructor(id, name, price, quantity) {
        if (id) {
            if (!ObjectId.isValid(id)) throw new ErrorResponse('Invalid product id', 400);
            this._id = new ObjectId(id)
        }
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    async save() {
        const client = await mongoConnect;
        const db = client.db(database).collection(productsCollection);
        const {acknowledged, insertedId} = await db.insertOne(this);
        return acknowledged ? insertedId : undefined;
    }
}