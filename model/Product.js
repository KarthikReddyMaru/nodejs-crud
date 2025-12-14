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

    static findById = async (id) => {
        if (id && !ObjectId.isValid(id))
            throw new ErrorResponse('Invalid object Id', 400);
        const client = await mongoConnect;
        return await client
            .db(database)
            .collection(productsCollection)
            .findOne({_id: new ObjectId(id)})
    }

    static find = async (page, size) => {
        page = Math.max(1, parseInt(page ?? '1', 10))
        size = Math.min(10, parseInt(size ?? '10', 10))
        const client = await mongoConnect
        return await client
            .db(database)
            .collection(productsCollection)
            .find()
            .sort({_id: "ascending"})
            .skip((page - 1) * size)
            .limit(size)
            .toArray();
    }

    async save() {
        const client = await mongoConnect;
        const db = client.db(database).collection(productsCollection);
        const {acknowledged, insertedId} = await db.insertOne(this);
        return acknowledged ? insertedId : undefined;
    }
}