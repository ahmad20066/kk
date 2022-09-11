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
    categories :[ {
        type : Schema.Types.ObjectId,
        ref : 'Category'   
    }]
    
});
module.exports  = mongoose.model('Section',sectionSchema);