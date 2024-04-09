const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const userDataSchema = new mongoose.Schema({
    UserID :{
        type : String,
        required : true
    },
    ResumeCount : {
        type : Number,
        default : 0
    },
    Name : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true
    },
    Picture :{
        type: String,
        required:true
    }
});

userDataSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
const userData = mongoose.model('userData', userDataSchema);

module.exports = userData;