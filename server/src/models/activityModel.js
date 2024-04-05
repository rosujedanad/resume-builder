const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const activityDataSchema = new mongoose.Schema({
    UserID :{
        type : String,
        required : true
    },
    "Extra Curricular Activities": {
        type : Array,
        items : {
            type : "object",
            properties : {
                "title":{type:String, required:true},
                "organisation":{type:String},
                "year":{type:String},
            }
        }
    }
});

activityDataSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
const activityData = mongoose.model('activityData', activityDataSchema);

module.exports = activityData;