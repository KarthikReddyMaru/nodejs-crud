const {Schema, model} = require('mongoose')

const cartItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    price: {
        type: Number,
        required: true,
        defaultValue: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
})

const cartSchema = new Schema({
    userId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    products: [cartItemSchema]
}, { timestamps: true })

cartSchema.index({
    userId: 1,
    "products.product": 1
}, { unique: true })

module.exports = model('Cart', cartSchema)