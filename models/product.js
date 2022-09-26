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
    filter: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "pending",
        enum : ['pending','accepted','rejected']
    },
    reviews : [{
        type : Schema.Types.ObjectId,
        ref : 'Review',
    }],
    parentProduct : {
        type : Schema.Types.ObjectId,
        ref : 'Product',
    },
    specificNote : {
        type : String,
    },
    custom : {
        type : Schema.Types.ObjectId,
        ref : 'CustomProduct',
    },

     
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
