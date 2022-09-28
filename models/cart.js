const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const cartSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
            type: ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        specificNote : {
            type : String,
        }
    }]
});
module.exports = mongoose.model('Cart', cartSchema);