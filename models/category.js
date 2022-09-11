const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = Schema({
    title: {
        type: String,
        required: true
    },
    
    section : {
        type : Schema.Types.ObjectId,
        ref : 'Section',
        required : true,

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("Category", categorySchema);