const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const skillDataSchema = new mongoose.Schema({
    userID :{
        type : String,
        required : true
    },
    resumeID :{
        type : String,
        required : true
    },
    technical: {
        type : [String],
        required : true
    },
    soft : {
        type : [String],
        required : true
    },
   
});

skillDataSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
const skillData = mongoose.model('skillData', skillDataSchema);

module.exports = skillData;