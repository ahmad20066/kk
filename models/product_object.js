const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productObjectSchema = Schema({
    reviews : [{
        type : Schema.Types.ObjectId,
        ref : 'Review',
    }],

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    imageUrls: [{
        type: String,
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,

    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    section: {
        type: Schema.Types.ObjectId,
        ref: "Section"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    rating: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    discountPrice: {
        type: Number,
        default: 0
    },
    custom: {
        type: Schema.Types.ObjectId,
        ref: 'CustomProduct'
    },
    status : {
        type : String,
    },
    filter: {
        type: String,
        default: ""
    }});
module.exports = mongoose.model("ProductObject", productObjectSchema);
