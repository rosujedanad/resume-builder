const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const skillDataSchema = new mongoose.Schema({
    UserID :{
        type : String,
        required : true
    },
    "Technical" : {
        type : array,
        items: {
            type: String
        }
    },
    "Non Technical" : {
        type : array,
        items: {
            type: String
        }
    },
   
});

skillDataSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
const skillData = mongoose.model('skillData', skillDataSchema);

module.exports = skillData;