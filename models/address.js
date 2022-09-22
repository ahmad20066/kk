const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const addresschema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    street: {
        type: String,
        required: true
    },
    building: {
        type: String,
        required: true
    },
    floor: {
        type: String,
    },
    description: {
        type: String,
    }

});
const Address = mongoose.model('Address', addresschema);
module.exports = Address;
