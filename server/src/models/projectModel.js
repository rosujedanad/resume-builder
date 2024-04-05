const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const projectDataSchema = new mongoose.Schema({
    UserID :{
        type : String,
        required : true
    },
    "Projects": {
        type : Array,
        items : {
            type : "object",
            properties : {
                "title":{type:String, required:true},
                "description":{type:String, required:true}
            }
        }
    }
});

projectDataSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
const projectData = mongoose.model('projectData', projectDataSchema);

module.exports = projectData;