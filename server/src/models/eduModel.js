const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const eduDataSchema = new mongoose.Schema({
    UserID :{
        type : String,
        required : true
    },
    "Higher Secondary" : {
        type : "object",
        properties : {
            "school": {type: String, required: true},
            "stream": {type: String, required: true},
            "percentage": {type: Number, required: true}
        }
    },
    "UG" : {
        type : "object",
        properties : {
            "college" : {type: String, required: true},
            "department" : {type: String, required: true},
            "cgpa" : {type: Number, required: true},
        }
    }

});

eduDataSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
const eduData = mongoose.model('eduData', eduDataSchema);

module.exports = eduData;