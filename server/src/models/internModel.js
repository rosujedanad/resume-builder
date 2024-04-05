const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const internDataSchema = new mongoose.Schema({
    UserID :{
        type : String,
        required : true
    },
    "Internships": {
        type : Array,
        items : {
            type : "object",
            properties : {
                "title":{type:String, required:true},
                "organisation":{type:String, required:true},
                "duration":{type:String},
            }
        }
    }
});

internDataSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
const internData = mongoose.model('internData', internDataSchema);

module.exports = internData;