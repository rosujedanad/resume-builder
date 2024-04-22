const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const eduDataSchema = new mongoose.Schema({
  UserID: {
    type: String,
    required: true,
  },
  resumeID: {
    type: String,
    required: true,
  },
  education: [
    {
      college: { type: String, required: true },
      department: { type: String, required: true },
      cgpa: { type: String, required: true },
      school: { type: String, required: true },
      stream: { type: String, required: true },
      percentage: { type: Number, required: true },
    },
  ],
});

eduDataSchema.plugin(mongooseDelete, { overrideMethods: "all" });
const eduData = mongoose.model("eduData", eduDataSchema);

module.exports = eduData;
