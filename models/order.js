//order model mongoose schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    isPaid: {
        type: Boolean,
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }


    }]


});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
