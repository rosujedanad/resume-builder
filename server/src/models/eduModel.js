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
      qualif: { type: String, required: true },
      institute: { type: String, required: true },
      department: { type: String, required: true },
      cgpa: { type: String, required: true },
    },
  ],
});

eduDataSchema.plugin(mongooseDelete, { overrideMethods: "all" });
const eduData = mongoose.model("eduData", eduDataSchema);

module.exports = eduData;
