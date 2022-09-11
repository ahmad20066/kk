const mongoose = require('mongoose');
const Category = require('../models/category');
const Schema = mongoose.Schema;
const sectionSchema = Schema({
    title : {
        type : String,
        required : true
    },
    icon : {
        type : String,
        required : true 
    },
    quote : {
        type : String,
        required :true,
    },
    
    
});
module.exports  = mongoose.model('Section',sectionSchema);