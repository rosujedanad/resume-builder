// Import any required services or models here
const Service = require('../services/service');

// Define your controller methods
exports.getExamples = async (req, res) => {
  try {
    const examples = await Service.getExamples();
    res.json(examples);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.signIn = async (req, res) => {
  try {
    console.log(req.body);
    const key = req.body;
    console.log("token",key.token);
    const newExample = await Service.signin(key.token);
    res.json(newExample);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createResume = async (req, res) => {
  try {
    console.log(req.body);
    const resumedetails = req.body;
    console.log("resumedetails", typeof (resumedetails));
    if (Object.keys(resumedetails).length === 0) {
      return res.status(400).json({ error: 'No Details' }); // Return early if there are no details
    }
    const newResume = await Service.CreateResume(resumedetails);
    return res.json(newResume); // Return the response and exit the function
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' }); // Return the error response and exit the function
  }
}

exports.viewResume = async (req,res) => {
  try {
    console.log("working")
    const userid = req.query.userid;
    console.log(userid,"userid")
    const resumeDetails = await Service.viewResume(userid);
    if(!resumeDetails) {
      return res.status(404).json({error : "Resume not found"})
    }
    return res.json(resumeDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}