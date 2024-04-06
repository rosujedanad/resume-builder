const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const contactDataSchema = new mongoose.Schema({
    userID :{
        type : String,
        required : true
    },
    resumeID :{
        type : String,
        required : true
    },
    place :{
        type : String,
        required :true
    },
    state :{
        type : String,
        required :true
    },
    mobile :{
        type : String,
        required :true
    },
    email : {
        type : String,
        required : true
    },
    linkedin : {
        type : String,
    },
    github : {
        type : String,
    }
});

contactDataSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
const contactData = mongoose.model('contactData', contactDataSchema);
module.exports = contactData;