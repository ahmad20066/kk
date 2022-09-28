//order model mongoose schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            product: {
                type: Object,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            specificNote: {
                type: String,
            }
        }
    ],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
        enum : ['pending','accepted','rejected','delivered','paid','cancelled']
            
    },
    address: {
        type : Schema.Types.ObjectId,
        ref : 'Address',
        required : true
    },
    shippingPrice : {
        type : Number,
        required : true
    },
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
