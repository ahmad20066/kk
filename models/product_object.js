const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productObjectSchema = Schema({
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    product : {
        type : Schema.Types.ObjectId,
        ref : 'Product',
        required : true,
    },
});
module.exports = mongoose.model("ProductObject", productObjectSchema);
