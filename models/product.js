const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const today = new Date();
const productSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,

    },
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
    custom : {
        type : Schema.Types.ObjectId,
        ref : 'CustomProduct'
    },
    filter : {
        type : String,
        default : ""
    }
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
