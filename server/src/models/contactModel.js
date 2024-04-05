const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const contactDataSchema = new mongoose.Schema({
    UserID :{
        type : String,
        required : true
    },
    Place :{
        type : String,
        required :true
    },
    State :{
        type : String,
        required :true
    },
    Mobile :{
        type : String,
        required :true
    },
    Email : {
        type : String,
        required : true
    },
    LinkedIn : {
        type : String,
    }
});

contactDataSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
const contactData = mongoose.model('contactData', contactDataSchema);
module.exports = contactData;