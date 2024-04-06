const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const userDataSchema = new mongoose.Schema({
    userID :{
        type : String,
        required : true
    },
    resumeID :{
        type : String,
        required : true
    },
    resumeCount : {
        type : Number,
        default : 0
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    picture :{
        type: String,
        required:true
    }
});

userDataSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
const userData = mongoose.model('userData', userDataSchema);

module.exports = userData;