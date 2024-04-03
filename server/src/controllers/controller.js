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
    const user = req.body;
    console.log(user);
    const newExample = await Service.signin(user);
    console.log(newExample);
    res.json(newExample);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};