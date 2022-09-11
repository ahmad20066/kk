const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sectionObjectSchema = Schema({
    title: {
        type: String,
        required: true
    },
    icon : {
        type : String,
        required : true 
    },
    quote : {
        type : String,
        required :true,
    },
    categories : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Category'
        }
    ]
});
module.exports = mongoose.model('SectionObject',sectionObjectSchema);
    