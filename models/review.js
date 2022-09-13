const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reviewSchema = Schema({
    content: {
        type: String,
        
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    image : {
        type : String,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model('Review', reviewSchema);
