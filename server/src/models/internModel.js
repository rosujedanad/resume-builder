const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const internDataSchema = new mongoose.Schema({
    userID :{
        type : String,
        required : true
    },
    resumeID :{
        type : String,
        required : true
    },
    "internships": {
        type : Array,
        items : {
            type : "object",
            properties : {
                "company":{type:String, required:true},
                "role":{type:String, required:true},
                "duration":{type:String,required:true},
                "description":{type:String, required:true}
            }
        }
    }
});

internDataSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
const internData = mongoose.model('internData', internDataSchema);

module.exports = internData;