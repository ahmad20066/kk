const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Role = {
    Default : 0,
    Seller : 1,
}
const userSchema = Schema({
    name : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    number : {
        type : String,
        required : true
    },
    
    role : {
        type : String,
        default : Role.Default
    },
    phoneOtp : {
        type : String,
    },
        

});
module.exports = mongoose.model('User',userSchema);