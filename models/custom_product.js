const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const customSchema = new Schema({
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }],
    chosenProducts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }],

});
module.exports = mongoose.model('CustomProduct', customSchema);