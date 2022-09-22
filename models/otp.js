const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const otpSchema = new Schema({
    otp: {
        type: String,
    },
    verified : {
          type : Boolean,
          default : false
    },
    phoneNumber: {
        type: String,},
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300
    },
});
module.exports = mongoose.model('Otp', otpSchema);
