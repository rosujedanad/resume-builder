const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const projectDataSchema = new mongoose.Schema({
    UserID :{
        type : String,
        required : true
    },
    resumeID :{
        type : String,
        required : true
    },
    projects: {
            title:{type:String, required:true},
            description:{type:String, required:true},
            techStack:{type:String, required:true},
            link:{type:String}
        }
    }
);

projectDataSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
const projectData = mongoose.model('projectData', projectDataSchema);

module.exports = projectData;