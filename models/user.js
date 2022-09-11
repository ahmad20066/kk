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
    email : {
        type : String,
        required : true,
    },
    password : {
        type  :String,
        required : true,
    },
    role : {
        type : Number,
        default : Role.Default
    },
    orders : [
        {
            type : Schema.Types.ObjectId,
            ref : "Order"
        }
    ],
    products : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Product'
        }],
    isAdmin : {
        type : Boolean,
        default : false
    }
        

});
module.exports = mongoose.model('User',userSchema);