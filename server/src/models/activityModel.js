const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const activityDataSchema = new mongoose.Schema({
    userID :{
        type : String,
        required : true
    },
    resumeID :{
        type : String,
        required : true
    },
    extraCurricular: {
            "name":{type:String, required:true},
            "description":{type:String, required:true},
    }
});

activityDataSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
const activityData = mongoose.model('activityData', activityDataSchema);

module.exports = activityData;