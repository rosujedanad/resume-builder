// Import any required models here
// const Example = require('../models/example');
const userData = require('../models/userModel');

// Define your service methods
exports.getExamples = async () => {
  return "value";

};

exports.signin = async (user) => {
    console.log("controllr",user);
  const resp = await userData.create({UserID:user.userid, Name:user.name,Email:user.email});
  console.log(resp);
  return resp;
};

